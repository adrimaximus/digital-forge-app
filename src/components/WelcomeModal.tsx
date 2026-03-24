
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface WelcomeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  visitorIP?: string | null;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ open, onOpenChange, visitorIP }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1 && name.trim()) {
      // Move to thank you message
      setStep(2);
      
      // Store name in localStorage with IP as part of the key
      if (visitorIP) {
        // Store in both localStorage (for persistent IP-based tracking)
        localStorage.setItem(`visitorName_${visitorIP}`, name);
        
        // And in sessionStorage (for current session usage across components)
        sessionStorage.setItem('visitorName', name);
      }
      
      // Optional: Store email for future use
      if (email && visitorIP) {
        localStorage.setItem(`visitorEmail_${visitorIP}`, email);
        sessionStorage.setItem('visitorEmail', email);
      }
      
      // Force an update on relevant components by dispatching a custom event
      window.dispatchEvent(new CustomEvent('visitorNameUpdated'));
      
      // Auto-close after showing thank you message
      setTimeout(() => {
        onOpenChange(false);
        toast({
          title: "Selamat datang!",
          description: `Senang bertemu denganmu, ${name}!`,
        });
      }, 3000);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {step === 1 ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-center text-lg">
                👋 Hi, saya boleh tahu namamu?
              </DialogTitle>
              <DialogDescription className="text-center text-sm text-gray-500">
                Kami ingin menyapa anda dengan nama yang tepat
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Input
                  id="name"
                  placeholder="Nama panggilan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full"
                  autoFocus
                  required
                />
              </div>
              <div className="space-y-2">
                <Input
                  id="email"
                  type="email"
                  placeholder="Email (opsional)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                Submit
              </Button>
            </form>
          </>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="text-2xl">✨</div>
            <h3 className="text-xl font-medium">Terima kasih {name}.</h3>
            <p>Silahkan explore betterworks.id. Have a nice day! 👋</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeModal;
