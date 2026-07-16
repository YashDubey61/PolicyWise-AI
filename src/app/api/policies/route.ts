import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createServerSupabaseClient();

    const { data: policies, error } = await supabase
      .from('policies')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: 'Failed to fetch policies' }, { status: 500 });
    }

    // Map snake_case to camelCase
    const mapped = (policies || []).map((p) => ({
      id: p.id,
      userId: p.user_id,
      name: p.name,
      fileName: p.file_name,
      fileUrl: p.file_url,
      fileSize: p.file_size,
      status: p.status,
      createdAt: p.created_at,
      updatedAt: p.updated_at,
    }));

    return NextResponse.json({ policies: mapped });
  } catch (error) {
    console.error('Policies fetch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: 'Policy ID is required' }, { status: 400 });
    }

    const supabase = createServerSupabaseClient();

    const { error } = await supabase
      .from('policies')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) {
      console.error('Failed to delete policy:', error);
      return NextResponse.json({ error: 'Failed to delete policy' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Policy delete error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
