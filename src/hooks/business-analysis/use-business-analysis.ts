import { useState } from 'react';
import { BusinessAnalysisState, BusinessFormData } from './types';
import { generateRecommendedServices, performAIAnalysis } from './analysis-utils';
import { storeLeadData } from './storage-utils';
import { updateLeadStats } from '@/utils/leadTracker';

export const useBusinessAnalysis = (onClose: () => void) => {
  // Initialize state with default values
  const [state, setState] = useState<BusinessAnalysisState>({
    step: 1,
    formData: {
      businessName: '',
      productType: '',
      numberOfEmployees: '',
      location: '',
      contactNumber: '',
      email: '',
      hasSocialMedia: false,
      socialMediaPlatforms: [],
      hasWebsite: false,
      websiteUrl: '',
      hasDigitalAds: false,
      challenges: [],
      otherChallenge: '',
    },
    recommendedServices: [],
    aiAnalysisResult: '',
    isAnalyzing: false,
  });

  // Next step handler
  const goToNextStep = async (formData: Partial<BusinessFormData>) => {
    // Update the state with the new form data
    const updatedFormData = { ...state.formData, ...formData };
    
    // If moving to the final step, generate AI analysis
    if (state.step === 3) {
      console.log("Moving to results step, setting analyzing state...");
      console.log("Business challenges selected:", updatedFormData.challenges);
      
      setState({
        ...state,
        step: state.step + 1,
        formData: updatedFormData,
        isAnalyzing: true,
      });
      
      try {
        // Get AI analysis
        console.log("Performing AI analysis with challenges:", updatedFormData.challenges);
        const cleanedResponse = await performAIAnalysis(updatedFormData);
        
        // Determine recommended services based on form data
        const topServices = generateRecommendedServices(updatedFormData);
        
        console.log("AI analysis completed, result length:", cleanedResponse?.length || 0);
        
        setState({
          ...state,
          step: state.step + 1,
          formData: updatedFormData,
          aiAnalysisResult: cleanedResponse,
          recommendedServices: topServices,
          isAnalyzing: false,
        });
      } catch (error) {
        console.error("Error analyzing business:", error);
        setState({
          ...state,
          step: state.step + 1,
          formData: updatedFormData,
          aiAnalysisResult: "Maaf, terjadi kesalahan dalam menganalisis bisnis Anda. Silakan coba lagi nanti.",
          isAnalyzing: false,
        });
      }
    } else {
      // Otherwise just move to the next step
      console.log(`Moving to step ${state.step + 1}`);
      setState({
        ...state,
        step: state.step + 1,
        formData: updatedFormData,
      });
    }
  };
  
  // Previous step handler
  const goToPrevStep = () => {
    if (state.step > 1) {
      setState({
        ...state,
        step: state.step - 1,
      });
    }
  };
  
  // Final form submission handler
  const handleSubmitForm = () => {
    // Store the lead data
    storeLeadData(state.formData, state.recommendedServices, state.aiAnalysisResult);
    
    // Update lead statistics when form is submitted
    updateLeadStats('business-analysis');
    
    // Dispatch a custom event to immediately update statistics on the admin dashboard
    const updateEvent = new CustomEvent('statsUpdated');
    window.dispatchEvent(updateEvent);
    
    // Close the form
    onClose();
  };

  return {
    state,
    goToNextStep,
    goToPrevStep,
    handleSubmitForm
  };
};
