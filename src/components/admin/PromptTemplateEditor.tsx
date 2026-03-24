
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RefreshCw } from 'lucide-react';

interface PromptTemplateEditorProps {
  promptTemplate: string;
  isLoading: boolean;
  onTemplateChange: (template: string) => void;
  onResetTemplate: () => void;
}

const PromptTemplateEditor: React.FC<PromptTemplateEditorProps> = ({
  promptTemplate,
  isLoading,
  onTemplateChange,
  onResetTemplate,
}) => {
  return (
    <div className="space-y-2">
      <Label>Template Prompt</Label>
      <div className="flex space-x-2 mb-1">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs"
          onClick={onResetTemplate}
          disabled={isLoading}
        >
          {isLoading ? (
            <><RefreshCw size={14} className="mr-1 animate-spin" /> Reset Template...</>
          ) : (
            <><RefreshCw size={14} className="mr-1" /> Reset ke Default</>
          )}
        </Button>
      </div>
      <Textarea 
        placeholder="Masukkan template prompt AI..." 
        className="min-h-[300px] bg-slate-900/50"
        value={promptTemplate}
        onChange={e => onTemplateChange(e.target.value)}
      />
      <p className="text-xs text-slate-400 mt-1">
        Template ini digunakan sebagai dasar untuk prompt AI. Gunakan variabel seperti {"{businessData.businessName}"} untuk menyisipkan data customer.
      </p>
    </div>
  );
};

export default PromptTemplateEditor;
