
import { toast } from '@/hooks/use-toast';

interface EventFormData {
  title: string;
  date: string;
  time: string;
  location: string;
}

export const validateEventForm = (formData: EventFormData): boolean => {
  console.log('Form submitted with data:', formData);
  
  // Basic validation
  if (!formData.title.trim()) {
    toast({
      title: "Validation Error",
      description: "Event title is required.",
      variant: "destructive",
    });
    return false;
  }
  
  if (!formData.date || !formData.time) {
    toast({
      title: "Validation Error",
      description: "Event date and time are required.",
      variant: "destructive",
    });
    return false;
  }
  
  if (!formData.location.trim()) {
    toast({
      title: "Validation Error",
      description: "Event location is required.",
      variant: "destructive",
    });
    return false;
  }

  console.log('Validation passed, calling mutation...');
  return true;
};
