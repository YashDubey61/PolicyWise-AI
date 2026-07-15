import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { generateFileName } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const name = (formData.get('name') as string) || file?.name?.replace('.pdf', '') || 'Untitled Policy';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Only PDF files are accepted' }, { status: 400 });
    }

    const MAX_SIZE = 20 * 1024 * 1024; // 20MB
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'File size must be under 20MB' }, { status: 400 });
    }

    const supabase = createServerSupabaseClient();
    const fileName = generateFileName(file.name, userId);

    // Upload to Supabase Storage
    const fileBuffer = await file.arrayBuffer();
    const { data: storageData, error: storageError } = await supabase.storage
      .from('policies')
      .upload(fileName, fileBuffer, {
        contentType: 'application/pdf',
        upsert: false,
      });

    if (storageError) {
      console.error('Storage error:', storageError);
      return NextResponse.json(
        { error: 'Failed to upload file. Please try again.' },
        { status: 500 }
      );
    }

    // Get public URL (or signed URL for private bucket)
    const { data: urlData } = supabase.storage
      .from('policies')
      .getPublicUrl(fileName);

    // Insert into policies table
    const { data: policy, error: dbError } = await supabase
      .from('policies')
      .insert({
        user_id: userId,
        name,
        file_name: file.name,
        file_url: urlData.publicUrl,
        file_size: file.size,
        status: 'processing',
      })
      .select()
      .single();

    if (dbError) {
      console.error('DB error:', dbError);
      return NextResponse.json(
        { error: 'Failed to save policy. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      policyId: policy.id,
      fileUrl: urlData.publicUrl,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
