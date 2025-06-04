
import { ImageUpload } from '@/components/ui/image-upload';

interface EventImageUploadProps {
  imageUrl: string;
  onInputChange: (field: string, value: string) => void;
}

export const EventImageUpload = ({ imageUrl, onInputChange }: EventImageUploadProps) => {
  const handleImageUploaded = (url: string) => {
    onInputChange('imageUrl', url);
  };

  const handleImageRemoved = () => {
    onInputChange('imageUrl', '');
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-900">Event Image</label>
      <ImageUpload
        currentImage={imageUrl}
        onImageUploaded={handleImageUploaded}
        onImageRemoved={handleImageRemoved}
      />
    </div>
  );
};
