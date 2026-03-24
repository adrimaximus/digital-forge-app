
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { buildBusinessAnalysisPrompt } from '@/utils/ai/promptBuilder';
import { BusinessData } from '@/utils/ai/types';
import PromptTemplateEditor from './PromptTemplateEditor';
import CreativityLevelSlider from './CreativityLevelSlider';
import SaveSettingsButton from './SaveSettingsButton';

interface PromptSettings {
  promptTemplate: string;
  creativityLevel: number;
}

const PromptSettingsTab: React.FC = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<PromptSettings>({
    promptTemplate: '',
    creativityLevel: 0.7, // Default creativity level
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Load saved settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('promptSettings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
        console.log("Loaded saved prompt settings from localStorage");
      } catch (e) {
        console.error("Error parsing saved prompt settings:", e);
        generateDefaultTemplate();
      }
    } else {
      // Generate a default template
      generateDefaultTemplate();
    }
  }, []);

  const generateDefaultTemplate = () => {
    // Generate a default template using a mock business data object
    const mockBusinessData: BusinessData = {
      businessName: "Example Business",
      productType: "Digital Product",
      numberOfEmployees: "10-50",
      location: "Jakarta",
      contactNumber: "08123456789",
      email: "contact@example.com",
      hasSocialMedia: true,
      socialMediaPlatforms: ["Instagram", "Facebook"],
      hasWebsite: true,
      websiteUrl: "example.com",
      hasDigitalAds: false,
      challenges: ["visibilitas_online", "komunikasi_pelanggan"],
      otherChallenge: ""
    };
    
    // Get the default template
    const templateText = buildBusinessAnalysisPrompt(mockBusinessData);
    
    setSettings(prev => ({
      ...prev,
      promptTemplate: templateText
    }));
    
    console.log("Generated default prompt template");
  };

  const handleSaveSettings = () => {
    setIsSaving(true);
    
    try {
      // Save settings to localStorage to be used by the AI analysis
      localStorage.setItem('promptSettings', JSON.stringify(settings));
      console.log("Saved prompt settings to localStorage:", settings);
      
      toast({
        title: "Pengaturan tersimpan",
        description: "Perubahan pada prompt AI telah berhasil disimpan.",
      });
    } catch (error) {
      console.error("Error saving prompt settings:", error);
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat menyimpan pengaturan.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetTemplate = () => {
    setIsLoading(true);
    
    try {
      generateDefaultTemplate();
      
      toast({
        title: "Template di-reset",
        description: "Template prompt telah dikembalikan ke pengaturan default.",
      });
    } catch (error) {
      console.error("Error resetting template:", error);
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat reset template.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTemplateChange = (template: string) => {
    setSettings(prev => ({ ...prev, promptTemplate: template }));
  };

  const handleCreativityLevelChange = (level: number) => {
    setSettings(prev => ({ ...prev, creativityLevel: level }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-6">Pengaturan Prompt AI</h2>
        <p className="text-slate-300 mb-6">
          Sesuaikan prompt dan parameter AI untuk analisis bisnis customer.
        </p>
      </div>
      
      <div className="space-y-6">
        <PromptTemplateEditor
          promptTemplate={settings.promptTemplate}
          isLoading={isLoading}
          onTemplateChange={handleTemplateChange}
          onResetTemplate={handleResetTemplate}
        />
        
        <div className="space-y-4">
          <CreativityLevelSlider
            creativityLevel={settings.creativityLevel}
            onCreativityLevelChange={handleCreativityLevelChange}
          />
        </div>
        
        <div className="pt-4">
          <SaveSettingsButton
            isSaving={isSaving}
            onSave={handleSaveSettings}
          />
        </div>
      </div>
    </div>
  );
};

export default PromptSettingsTab;
