'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Eye, Download } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { PageHeader } from '@/components/shared/page-header';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    analysisComplete: true,
    weeklyDigest: false,
    marketing: false,
  });

  const [privacy, setPrivacy] = useState({
    shareAnalytics: false,
    allowCookies: true,
  });

  const handleSave = () => {
    toast.success('Settings saved successfully!');
  };

  return (
    <div className="max-w-2xl space-y-8">
      <PageHeader title="Settings" description="Manage your account preferences." />

      {/* Notifications */}
      <SettingsSection
        icon={Bell}
        title="Notifications"
        description="Control how and when we contact you."
      >
        <SettingRow
          label="Email Notifications"
          description="Receive important account emails"
          checked={notifications.email}
          onCheckedChange={(v) => setNotifications({ ...notifications, email: v })}
        />
        <SettingRow
          label="Analysis Complete"
          description="Get notified when policy analysis finishes"
          checked={notifications.analysisComplete}
          onCheckedChange={(v) => setNotifications({ ...notifications, analysisComplete: v })}
        />
        <SettingRow
          label="Weekly Digest"
          description="Weekly summary of your insurance insights"
          checked={notifications.weeklyDigest}
          onCheckedChange={(v) => setNotifications({ ...notifications, weeklyDigest: v })}
        />
        <SettingRow
          label="Marketing Emails"
          description="Product updates and tips"
          checked={notifications.marketing}
          onCheckedChange={(v) => setNotifications({ ...notifications, marketing: v })}
        />
      </SettingsSection>

      {/* Privacy */}
      <SettingsSection
        icon={Eye}
        title="Privacy"
        description="Control your data and privacy settings."
      >
        <SettingRow
          label="Share Analytics"
          description="Help improve PolicyWise AI with anonymous usage data"
          checked={privacy.shareAnalytics}
          onCheckedChange={(v) => setPrivacy({ ...privacy, shareAnalytics: v })}
        />
        <SettingRow
          label="Essential Cookies"
          description="Required for the app to function properly"
          checked={privacy.allowCookies}
          onCheckedChange={(v) => setPrivacy({ ...privacy, allowCookies: v })}
          disabled
        />
      </SettingsSection>

      {/* Data */}
      <SettingsSection
        icon={Download}
        title="Data"
        description="Manage your stored data."
      >
        <div className="flex items-center justify-between py-3">
          <div>
            <p className="text-sm font-medium text-foreground">Export Your Data</p>
            <p className="text-xs text-muted-foreground">Download all your policy analyses as JSON</p>
          </div>
          <Button variant="outline" size="sm" className="rounded-xl" onClick={() => toast.info('Export feature coming soon!')}>
            <Download className="mr-1.5 w-3.5 h-3.5" />
            Export
          </Button>
        </div>
      </SettingsSection>

      {/* Save */}
      <Button
        onClick={handleSave}
        className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-90"
      >
        Save Settings
      </Button>
    </div>
  );
}

function SettingsSection({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-card border border-border p-6"
    >
      <div className="flex items-center gap-2 mb-1">
        <Icon className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>
      <p className="text-xs text-muted-foreground mb-5">{description}</p>
      <div className="space-y-1 divide-y divide-border">{children}</div>
    </motion.div>
  );
}

function SettingRow({
  label,
  description,
  checked,
  onCheckedChange,
  disabled,
}: {
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <Label className="text-sm font-medium text-foreground">{label}</Label>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
      />
    </div>
  );
}
