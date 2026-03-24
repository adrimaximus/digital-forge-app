
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, Edit2, X } from 'lucide-react';

interface AffiliateEditorProps {
  leadId: string;
  affiliateEmail?: string;
  onSave: (id: string, email: string) => void;
}

const AffiliateEditor: React.FC<AffiliateEditorProps> = ({ leadId, affiliateEmail, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [emailValue, setEmailValue] = useState(affiliateEmail || '');

  const handleSave = () => {
    onSave(leadId, emailValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEmailValue(affiliateEmail || '');
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="flex items-center space-x-2">
        <Input
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
          className="h-8 text-sm w-32 bg-slate-600 border-slate-500"
          placeholder="Email affiliate"
        />
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-green-400 hover:text-green-300 hover:bg-green-900/20"
          onClick={handleSave}
        >
          <Check className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-900/20"
          onClick={handleCancel}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm">
        {affiliateEmail || '-'}
      </span>
      <Button
        variant="ghost"
        size="sm"
        className="h-7 w-7 p-0 text-slate-300 hover:text-white hover:bg-slate-600"
        onClick={() => setIsEditing(true)}
      >
        <Edit2 className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
};

export default AffiliateEditor;
