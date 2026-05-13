"use client";

import React, { useState } from 'react';
import { Plus, Webhook, Zap } from 'lucide-react';
import Header from '@/components/ui/Header';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';
import EmptyState from '@/components/ui/EmptyState';
import WebhookCard from '@/components/ui/WebhookCard';

export default function WebhooksPage() {
  const [webhooks, setWebhooks] = useState([
    { id: 1, name: 'Slack Notifications', url: 'https://hooks.slack.com/services/...', status: 'Active', lastUsed: '2 mins ago' },
    { id: 2, name: 'Discord Bot', url: 'https://discord.com/api/webhooks/...', status: 'Active', lastUsed: '1 hour ago' },
    { id: 3, name: 'Custom ERP Sync', url: 'https://api.mycompany.com/v1/webhook', status: 'Failed', lastUsed: 'Yesterday' },
  ]);

  const handleCreateWebhook = () => {
    console.log('Create webhook clicked');
  };

  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(url);
    console.log('URL copied:', url);
  };

  const handleViewDetails = (webhook) => {
    console.log('View details for:', webhook.name);
  };

  const handleMoreOptions = (webhook) => {
    console.log('More options for:', webhook.name);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 font-sans">
      
      <Header 
        title="Webhooks"
        subtitle="Send real-time events to your favorite apps"
        icon={<Webhook size={28} strokeWidth={2.5} />}
        iconBgColor="bg-[#ecfdf5]"
        iconTextColor="text-[#059669]"
        iconBorderColor="border-[#d1fae5]"
        actions={
          <Button 
            variant="primary"
            size="md"
            onClick={handleCreateWebhook}
            leftIcon={<Plus size={18} />}
          >
            Create Webhook
          </Button>
        }
      />

      <Alert 
        type="info"
        icon={<Zap size={18} />}
        title="Webhooks Information"
      >
        Webhooks allow external services to be notified when certain events happen. 
        When the specified events occur, we'll send a POST request to each of the URLs you provide.
      </Alert>

      <div className="grid gap-4">
        {webhooks.map((hook) => (
          <WebhookCard
            key={hook.id}
            id={hook.id}
            name={hook.name}
            url={hook.url}
            status={hook.status}
            lastUsed={hook.lastUsed}
            onCopy={handleCopyUrl}
            onViewDetails={handleViewDetails}
            onMoreOptions={handleMoreOptions}
          />
        ))}
      </div>

      <EmptyState
        icon={<Webhook size={32} />}
        title="Need help with Webhooks?"
        description="Check out our documentation to learn how to integrate your system with our real-time event stream."
        buttonText="Read Documentation →"
        onButtonClick={() => console.log('Open documentation')}
      />
    </div>
  );
}