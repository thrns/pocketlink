import React, { useState, useEffect, useRef } from 'react';
import {
  PenLine,
  Check,
  X,
  Quote,
  PlusCircle,
  Upload,
  Download,
  ChevronLeft,
  ChevronRight,
  Settings,
  Star,
  Info,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useItems } from '@/app/contexts/ItemsContext';
import { useFetch } from '@/app/contexts/FetcherContext';
import { Switch } from '@/components/ui/switch';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectFade,
  EffectCards,
} from 'swiper/modules';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StarFilledIcon, StarIcon } from '@radix-ui/react-icons';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-cards';

export default function TestimonialsCard({
  itemId,
  card,
  isEditing,
  sizeKey,
  isTenant,
  isMobile = false,
  onSelect,
  setIsIsolate,
  setIsEditing: setParentIsEditing,
  enableDrag,
  setEnableDrag,
  isPhone,
  allowEdit,
  parentId,
  themeData,
}) {
  const { updateItemContent } = useItems();
  const { items, mobileItems } = useFetch();

  const containerRef = useRef(null);
  const swiperRef = useRef(null);
  const fileInputRef = useRef(null);

  // State for settings
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAddTestimonialOpen, setIsAddTestimonialOpen] = useState(false);
  const [isCsvUploadOpen, setIsCsvUploadOpen] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(card?.scrollSpeed || 300);
  const [autoScroll, setAutoScroll] = useState(card?.autoScroll || true);
  const [autoScrollInterval, setAutoScrollInterval] = useState(
    card?.autoScrollInterval || 5000
  );
  const [effect, setEffect] = useState(card?.effect || 'slide');
  const [isHover, setIsHover] = useState(false);

  // Testimonials state
  const [testimonials, setTestimonials] = useState(card?.testimonials || []);
  const [currentTestimonial, setCurrentTestimonial] = useState({
    name: '',
    role: '',
    company: '',
    text: '',
    rating: 5,
    image: '',
  });
  const [csvFile, setCsvFile] = useState(null);
  const [csvError, setCsvError] = useState('');

  // File drop handling
  const [isDragging, setIsDragging] = useState(false);

  // Update testimonials if card prop changes
  useEffect(() => {
    if (card?.testimonials) {
      setTestimonials(card.testimonials);
    }
  }, [card?.testimonials]);

  // Function to check if device is mobile
  const isMobileDevice = () => {
    return isMobile || isPhone || window.innerWidth < 768;
  };

  // Function to ensure only one dialog is open at a time
  const openDialog = (dialogName) => {
    // Make sure we're not trying to open multiple dialogs
    setIsSettingsOpen(false);
    setIsAddTestimonialOpen(false);
    setIsCsvUploadOpen(false);

    // Then open the requested dialog
    if (dialogName === 'addTestimonial') {
      setIsAddTestimonialOpen(true);
    } else if (dialogName === 'csvUpload') {
      setIsCsvUploadOpen(true);
    } else if (dialogName === 'settings') {
      setIsSettingsOpen(true);
    }
  };

  // Update the card content when settings change
  const updateCardContent = (updates) => {
    updateItemContent(itemId, { ...updates });
  };

  const handleScrollSpeedChange = (value) => {
    const speed = parseInt(value);
    if (!isNaN(speed) && speed > 0) {
      setScrollSpeed(speed);
      updateCardContent({ scrollSpeed: speed });
    }
  };

  const handleAutoScrollChange = (checked) => {
    setAutoScroll(checked);
    updateCardContent({ autoScroll: checked });

    // Apply autoplay to swiper
    if (swiperRef.current && swiperRef.current.swiper) {
      if (checked) {
        swiperRef.current.swiper.autoplay.start();
      } else {
        swiperRef.current.swiper.autoplay.stop();
      }
    }
  };

  const handleIntervalChange = (value) => {
    const interval = parseInt(value);
    if (!isNaN(interval) && interval > 0) {
      setAutoScrollInterval(interval);
      updateCardContent({ autoScrollInterval: interval });

      // Update autoplay delay in swiper
      if (swiperRef.current && swiperRef.current.swiper) {
        swiperRef.current.swiper.params.autoplay.delay = interval;
        swiperRef.current.swiper.autoplay.stop();
        swiperRef.current.swiper.autoplay.start();
      }
    }
  };

  const handleEffectChange = (value) => {
    setEffect(value);
    updateCardContent({ effect: value });
  };

  const handleSaveSettings = () => {
    updateCardContent({
      scrollSpeed,
      autoScroll,
      autoScrollInterval,
      effect,
      testimonials,
    });
    setIsSettingsOpen(false);
  };

  // Testimonial management
  const handleTestimonialChange = (field, value) => {
    setCurrentTestimonial((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddTestimonial = () => {
    if (!currentTestimonial.text || !currentTestimonial.name) return;

    // If we're editing an existing testimonial
    if (currentTestimonial.id) {
      const updatedTestimonials = testimonials.map((t) =>
        t.id === currentTestimonial.id ? { ...currentTestimonial } : t
      );
      setTestimonials(updatedTestimonials);
      updateCardContent({ testimonials: updatedTestimonials });
    } else {
      // Adding a new testimonial
      const newTestimonial = {
        ...currentTestimonial,
        id: `testimonial-${Date.now()}`,
        date: new Date().toISOString(),
      };

      const updatedTestimonials = [...testimonials, newTestimonial];
      setTestimonials(updatedTestimonials);
      updateCardContent({ testimonials: updatedTestimonials });
    }

    // Reset form
    setCurrentTestimonial({
      name: '',
      role: '',
      company: '',
      text: '',
      rating: 5,
      image: '',
    });
    setIsAddTestimonialOpen(false);
  };

  const handleDeleteTestimonial = (id) => {
    const updatedTestimonials = testimonials.filter((t) => t.id !== id);
    setTestimonials(updatedTestimonials);
    updateCardContent({ testimonials: updatedTestimonials });
  };

  const handleEditTestimonial = (testimonial) => {
    setCurrentTestimonial(testimonial);
    setIsAddTestimonialOpen(true);
  };

  // File drop handling
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
        setCsvError('Please upload a CSV file');
        return;
      }
      setCsvFile(file);
      setCsvError('');
    }
  };

  // Improved file input triggering with timeout
  const triggerFileInput = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // Use setTimeout to ensure DOM is fully rendered and event queue is clear
    setTimeout(() => {
      if (fileInputRef.current) {
        try {
          fileInputRef.current.click();
        } catch (err) {
          console.error('Error opening file dialog:', err);
          // Fallback method
          const evt = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
          });
          fileInputRef.current.dispatchEvent(evt);
        }
      }
    }, 50);
  };

  // Improved download sample function
  const handleDownloadSample = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const csvContent = `name,role,company,text,rating,image
John Doe,CEO,Acme Inc.,"This product has transformed how we do business. Highly recommend!",5,https://randomuser.me/api/portraits/men/1.jpg
Jane Smith,Designer,Creative Studios,"The user experience is fantastic and has helped our clients tremendously.",4,https://randomuser.me/api/portraits/women/2.jpg
Michael Johnson,CTO,Tech Solutions,"We've integrated this into our workflow and it's been a game-changer.",5,https://randomuser.me/api/portraits/men/3.jpg
Lisa Brown,Marketing Manager,Media Group,"Easy to use and tremendous value for the price.",5,https://randomuser.me/api/portraits/women/4.jpg
David Wilson,Customer,,"I was skeptical at first, but now I can't imagine working without it.",4,`;

    // Create a blob and download it programmatically
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'sample-testimonials.csv');
    document.body.appendChild(link);
    link.click();

    // Clean up
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);
  };

  const parseCsvFile = (text) => {
    const lines = text.split('\n');
    if (lines.length === 0) {
      return { success: false, error: 'Empty file' };
    }

    // Try to detect the CSV format header
    const header = lines[0].split(',');
    const requiredFields = ['name', 'text'];
    const headerMap = {};

    // Map the header fields
    header.forEach((field, index) => {
      const cleanField = field.trim().toLowerCase();
      headerMap[cleanField] = index;
    });

    // Validate that required fields exist
    const missingFields = requiredFields.filter(
      (field) => typeof headerMap[field] === 'undefined'
    );
    if (missingFields.length > 0) {
      return {
        success: false,
        error: `Missing required fields: ${missingFields.join(', ')}`,
      };
    }

    // Parse the rows
    const parsedTestimonials = [];
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;

      const values = lines[i].split(',');
      const testimonial = {
        id: `testimonial-${Date.now()}-${i}`,
        date: new Date().toISOString(),
        name: values[headerMap.name]?.trim() || 'Anonymous',
        text: values[headerMap.text]?.trim() || '',
        role: values[headerMap.role || headerMap.title]?.trim() || '',
        company:
          values[headerMap.company || headerMap.organization]?.trim() || '',
        rating: parseInt(
          values[headerMap.rating || headerMap.stars]?.trim() || '5'
        ),
        image: values[headerMap.image || headerMap.avatar]?.trim() || '',
      };

      // Only add if it has minimum required data
      if (testimonial.text) {
        parsedTestimonials.push(testimonial);
      }
    }

    return {
      success: true,
      testimonials: parsedTestimonials,
    };
  };

  const handleCsvUpload = () => {
    if (!csvFile) {
      setCsvError('Please select a CSV file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const result = parseCsvFile(text);

      if (result.success) {
        if (result.testimonials.length === 0) {
          setCsvError('No valid testimonials found in file');
          return;
        }

        // Add new testimonials to existing ones
        const updatedTestimonials = [...testimonials, ...result.testimonials];
        setTestimonials(updatedTestimonials);
        updateCardContent({ testimonials: updatedTestimonials });
        setIsCsvUploadOpen(false);
        setCsvFile(null);
        setCsvError('');
      } else {
        setCsvError(result.error);
      }
    };

    reader.readAsText(csvFile);
  };

  // Render testimonial stars - enhanced with better styling
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <StarFilledIcon
            key={`star-${i}`}
            className="h-4 w-4 text-yellow-400"
          />
        );
      } else {
        stars.push(
          <StarIcon key={`star-${i}`} className="h-4 w-4 text-gray-300" />
        );
      }
    }
    return <div className="flex items-center space-x-1">{stars}</div>;
  };

  // Enhanced testimonial rating selector with animations
  const RatingSelector = ({ value, onChange }) => {
    return (
      <div className="flex space-x-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="rounded-full p-1 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            {star <= value ? (
              <StarFilledIcon className="h-6 w-6 text-yellow-400" />
            ) : (
              <StarIcon className="h-6 w-6 text-gray-300 hover:text-gray-400" />
            )}
          </button>
        ))}
      </div>
    );
  };

  // Render the testimonials with enhanced UI
  const renderTestimonials = () => {
    if (!testimonials || testimonials.length === 0) {
      return renderEmptyState();
    }

    return (
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay, EffectFade, EffectCards]}
        spaceBetween={30}
        slidesPerView={1}
        navigation={{
          nextEl: '.testimonial-next',
          prevEl: '.testimonial-prev',
        }}
        pagination={{
          clickable: true,
          el: '.testimonial-pagination',
          bulletClass:
            'inline-block w-2 h-2 mx-1 rounded-full bg-gray-300 cursor-pointer transition-all duration-300',
          bulletActiveClass: 'bg-blue-500 w-4',
        }}
        className="relative h-full w-full"
        speed={scrollSpeed}
        autoplay={
          autoScroll
            ? {
                delay: autoScrollInterval,
                disableOnInteraction: false,
              }
            : false
        }
        effect={effect}
        loop={testimonials.length > 1}
        style={{
          width: '100%',
        }}
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id} className="h-full">
            <div
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
              className="relative flex h-full flex-col items-center justify-center overflow-hidden rounded-lg border border-gray-100 bg-white"
            >
              {isHover && isEditing && (
                <div className="absolute right-3 top-3 z-10 flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full border border-gray-100 bg-white/80 hover:bg-white/90"
                    onClick={() => handleEditTestimonial(testimonial)}
                  >
                    <PenLine className="h-4 w-4 text-gray-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full border border-gray-100 bg-white/80 hover:bg-red-50"
                    onClick={() => handleDeleteTestimonial(testimonial.id)}
                  >
                    <X className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              )}

              <div className="mx-auto flex w-full max-w-xl flex-col items-center px-5 py-8 md:py-10">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                  <Quote className="h-6 w-6 text-blue-500" />
                </div>

                <div className="mb-8 text-center">
                  <p className="mb-4 text-base font-medium italic leading-relaxed text-gray-800 md:text-lg lg:text-xl">
                    "{testimonial.text}"
                  </p>

                  <div className="mb-4 flex items-center justify-center space-x-2">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>

                <div className="flex flex-col items-center sm:flex-row">
                  {testimonial.image ? (
                    <Avatar className="mb-3 h-14 w-14 ring-2 ring-white sm:mb-0 sm:mr-4">
                      <AvatarImage
                        src={testimonial.image}
                        alt={testimonial.name}
                      />
                      <AvatarFallback className="bg-blue-100 font-medium text-blue-600">
                        {testimonial.name?.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <Avatar className="mb-3 h-14 w-14 bg-blue-100 text-blue-600 ring-2 ring-white sm:mb-0 sm:mr-4">
                      <AvatarFallback>
                        {testimonial?.name?.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div className="text-center sm:text-left">
                    <h4 className="text-base font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    {testimonial.role && testimonial.company ? (
                      <p className="text-sm text-gray-500">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    ) : (
                      <p className="text-sm text-gray-500">
                        {testimonial.role || testimonial.company || ''}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom navigation buttons */}
        {testimonials.length > 1 && (
          <>
            <button className="testimonial-prev absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 transform items-center justify-center rounded-full border border-gray-200 bg-white/70 shadow-md transition-all duration-200 hover:bg-white">
              <ChevronLeft className="h-5 w-5 text-gray-700" />
            </button>
            <button className="testimonial-next absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 transform items-center justify-center rounded-full border border-gray-200 bg-white/70 shadow-md transition-all duration-200 hover:bg-white">
              <ChevronRight className="h-5 w-5 text-gray-700" />
            </button>
            <div className="testimonial-pagination absolute bottom-4 left-0 right-0 z-10 flex justify-center"></div>
          </>
        )}
      </Swiper>
    );
  };

  // Enhanced empty state with better visuals
  const renderEmptyState = () => {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-xl bg-gray-50 p-4 text-center">
        <div className="mb-4 rounded-full bg-white p-6">
          <Quote className="h-12 w-12 text-gray-300" />
        </div>
        <h3 className="mb-2 text-lg font-medium text-gray-800">
          {isTenant ? 'No testimonials yet' : 'Add customer testimonials'}
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md text-sm">
          {isTenant
            ? 'There are no testimonials to display at this time.'
            : 'Share what your customers are saying about your product or service to build trust with potential customers.'}
        </p>
        {isEditing && (
          <div className="flex w-full max-w-md flex-col gap-3 md:flex-row">
            <Button
              variant="default"
              size="sm"
              className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => openDialog('addTestimonial')}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Testimonial
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50"
              onClick={() => openDialog('csvUpload')}
            >
              <Upload className="mr-2 h-4 w-4" />
              Import from CSV
            </Button>
          </div>
        )}
      </div>
    );
  };

  // Get the appropriate size class
  const getSizeClass = () => {
    return isMobile ? 'min-h-[100px]' : 'min-h-[100px]';
  };

  return (
    <div
      className={cn(
        'relative flex w-full flex-col overflow-hidden rounded-xl transition-all duration-200',
        'bg-gradient-to-br from-gray-50 to-gray-100',
        'border border-gray-200',
        isEditing && 'cursor-move',
        isMobile && 'mx-auto max-w-full'
      )}
      ref={containerRef}
      style={isMobile ? { width: '100%', minWidth: '100%' } : {}}
    >
      {/* Testimonials Content */}
      <div className="relative flex w-full flex-1 flex-col items-center justify-center overflow-hidden">
        {renderTestimonials()}
      </div>

      {/* Add Testimonial Dialog */}
      <Dialog
        open={isAddTestimonialOpen}
        onOpenChange={(open) => {
          // Only change state if it's different to avoid unnecessary re-renders
          if (open !== isAddTestimonialOpen) {
            setIsAddTestimonialOpen(open);
            if (!open && currentTestimonial.id) {
              setCurrentTestimonial({
                name: '',
                role: '',
                company: '',
                text: '',
                rating: 5,
                image: '',
              });
            }
          }
        }}
      >
        <DialogContent className="flex max-h-[90vh] max-w-lg flex-col overflow-hidden p-0">
          <DialogHeader className="border-b border-gray-200 bg-gray-50 px-6 py-4">
            <DialogTitle className="text-xl font-bold text-black">
              {currentTestimonial.id
                ? 'Edit Testimonial'
                : 'Add New Testimonial'}
            </DialogTitle>
          </DialogHeader>

          <div className="flex-1 space-y-5 overflow-y-auto px-6 py-4">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-medium text-gray-700">
                  Name *
                </Label>
                <Input
                  id="name"
                  value={currentTestimonial.name}
                  onChange={(e) =>
                    handleTestimonialChange('name', e.target.value)
                  }
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="font-medium text-gray-700">
                  Role/Title
                </Label>
                <Input
                  id="role"
                  value={currentTestimonial.role}
                  onChange={(e) =>
                    handleTestimonialChange('role', e.target.value)
                  }
                  placeholder="CEO"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="company" className="font-medium text-gray-700">
                Company/Organization
              </Label>
              <Input
                id="company"
                value={currentTestimonial.company}
                onChange={(e) =>
                  handleTestimonialChange('company', e.target.value)
                }
                placeholder="Acme Inc."
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="testimonial-text"
                className="font-medium text-gray-700"
              >
                Testimonial *
              </Label>
              <Textarea
                id="testimonial-text"
                value={currentTestimonial.text}
                onChange={(e) =>
                  handleTestimonialChange('text', e.target.value)
                }
                placeholder="Share your thoughts about our product or service..."
                required
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="rating" className="font-medium text-gray-700">
                Rating
              </Label>
              <div className="rounded-lg bg-gray-50 p-3">
                <RatingSelector
                  value={currentTestimonial.rating}
                  onChange={(rating) =>
                    handleTestimonialChange('rating', rating)
                  }
                />
                <div className="mt-1 text-xs text-gray-500">
                  {currentTestimonial.rating} out of 5 stars
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image" className="font-medium text-gray-700">
                Profile Image URL
              </Label>
              <Input
                id="image"
                value={currentTestimonial.image}
                onChange={(e) =>
                  handleTestimonialChange('image', e.target.value)
                }
                placeholder="https://example.com/avatar.jpg"
              />
              {currentTestimonial.image && (
                <div className="mt-2 flex items-center space-x-2">
                  <Avatar className="h-10 w-10 rounded-full border border-gray-200">
                    <AvatarImage src={currentTestimonial.image} alt="Preview" />
                    <AvatarFallback>
                      {currentTestimonial?.name?.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-gray-500">Image preview</span>
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="border-t border-gray-200 bg-gray-50 px-6 py-4">
            <Button
              variant="outline"
              onClick={() => {
                setIsAddTestimonialOpen(false);
                if (currentTestimonial.id) {
                  setCurrentTestimonial({
                    name: '',
                    role: '',
                    company: '',
                    text: '',
                    rating: 5,
                    image: '',
                  });
                }
              }}
              className="dark:border-gray-600 dark:bg-[#1b1b1b] dark:text-gray-200"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddTestimonial}
              disabled={!currentTestimonial.text || !currentTestimonial.name}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              {currentTestimonial.id ? 'Save Changes' : 'Add Testimonial'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* CSV Upload Dialog */}
      <Dialog
        open={isCsvUploadOpen}
        onOpenChange={(open) => {
          // Only change state if it's different to avoid unnecessary re-renders
          if (open !== isCsvUploadOpen) {
            setIsCsvUploadOpen(open);
            if (!open) {
              // Reset state when dialog closes
              setCsvFile(null);
              setCsvError('');
            }
          }
        }}
      >
        <DialogContent className="flex max-h-[80vh] max-w-lg flex-col overflow-hidden p-0">
          <DialogHeader className="border-b border-gray-200 bg-gray-50 px-6 py-4">
            <DialogTitle className="text-xl font-bold text-gray-900">
              Import Testimonials from CSV
            </DialogTitle>
          </DialogHeader>

          <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
            <div className="space-y-3">
              <Label className="font-medium text-gray-700">
                Upload CSV File
              </Label>
              <div className="flex flex-col gap-3">
                <div
                  className={`flex w-full cursor-pointer items-center justify-center border-2 border-dashed ${
                    isDragging
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 bg-gray-50'
                  } rounded-lg px-4 py-8 transition-colors hover:bg-gray-100`}
                  onClick={(e) => triggerFileInput(e)}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && triggerFileInput(e)}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">
                      <Upload className="h-7 w-7 text-blue-500" />
                    </div>
                    <p className="mb-1 text-base font-medium text-gray-700">
                      {csvFile ? csvFile.name : 'Drag & drop a CSV file here'}
                    </p>
                    <p className="text-sm text-gray-500">
                      or click to browse files
                    </p>
                  </div>
                </div>

                {/* Hidden file input */}
                <input
                  type="file"
                  accept=".csv"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      if (
                        file.type !== 'text/csv' &&
                        !file.name.endsWith('.csv')
                      ) {
                        setCsvError('Please upload a CSV file');
                        return;
                      }
                      setCsvFile(file);
                      setCsvError('');
                    }
                  }}
                  ref={fileInputRef}
                  className="hidden"
                  id="csv-file-input"
                  tabIndex={-1}
                />

                {csvFile && (
                  <div className="flex items-center rounded-lg bg-green-50 p-3">
                    <Check className="mr-2 h-5 w-5 flex-shrink-0 text-green-500" />
                    <div>
                      <p className="text-sm font-medium text-green-800">
                        File selected: {csvFile.name}
                      </p>
                      <p className="text-xs text-green-600">
                        {Math.round(csvFile.size / 1024)} KB
                      </p>
                    </div>
                  </div>
                )}
                {csvError && (
                  <div className="flex items-center rounded-lg bg-red-50 p-3">
                    <X className="mr-2 h-5 w-5 flex-shrink-0 text-red-500" />
                    <p className="text-sm text-red-800">{csvError}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-lg bg-gray-50 p-4 text-sm">
              <h4 className="mb-3 flex items-center font-semibold text-gray-800">
                <Info className="mr-2 h-4 w-4 text-blue-500" />
                CSV Format Guidelines
              </h4>
              <ul className="list-disc space-y-2 pl-6 text-gray-600">
                <li>First row should contain headers</li>
                <li>
                  Required columns:{' '}
                  <span className="font-medium text-blue-600">"name"</span>,{' '}
                  <span className="font-medium text-blue-600">"text"</span>
                </li>
                <li>
                  Optional columns:{' '}
                  <span className="text-gray-500">"role"</span>,{' '}
                  <span className="text-gray-500">"company"</span>,{' '}
                  <span className="text-gray-500">"rating"</span>,{' '}
                  <span className="text-gray-500">"image"</span>
                </li>
              </ul>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleDownloadSample}
                  className="inline-flex items-center rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Sample
                </button>
              </div>
            </div>
          </div>

          <DialogFooter className="border-t border-gray-200 bg-gray-50 px-6 py-4">
            <Button
              variant="outline"
              onClick={() => {
                setIsCsvUploadOpen(false);
                setCsvFile(null);
                setCsvError('');
              }}
              className="dark:border-gray-600 dark:bg-[#1b1b1b] dark:text-gray-200"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCsvUpload}
              disabled={!csvFile}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Import Testimonials
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Settings Panel */}
      {isEditing && (
        <div className="absolute right-3 top-3 z-10 flex gap-1">
          <TooltipProvider>
            {/* Add Button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 rounded-full border border-gray-200 bg-white/90 hover:bg-white"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    openDialog('addTestimonial');
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <PlusCircle size={15} className="text-blue-600" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="border-gray-700 bg-black text-gray-200">
                <p>Add Testimonial</p>
              </TooltipContent>
            </Tooltip>

            {/* CSV Upload Button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 rounded-full border border-gray-200 bg-white/90 hover:bg-white"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    openDialog('csvUpload');
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <Upload
                    size={15}
                    className="text-green-600 dark:text-green-400"
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="border-gray-700 bg-black text-gray-200">
                <p>Import from CSV</p>
              </TooltipContent>
            </Tooltip>

            {/* Settings Popover */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Popover
                  open={isSettingsOpen}
                  onOpenChange={(open) => {
                    if (open !== isSettingsOpen) {
                      setIsSettingsOpen(open);
                    }
                  }}
                >
                  <PopoverTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 rounded-full border border-gray-200 bg-white/90 hover:bg-white"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        openDialog('settings');
                      }}
                      onMouseDown={(e) => e.stopPropagation()}
                    >
                      <Settings size={15} className="text-gray-600" />
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent
                    className="w-80 overflow-hidden rounded-lg p-0 shadow-lg"
                    align="end"
                    sideOffset={5}
                  >
                    {/* Fixed Header */}
                    <div className="sticky top-0 z-20 flex items-center border-b bg-gray-50 px-4 py-3 font-medium text-gray-700">
                      <Settings className="mr-2 h-4 w-4 text-gray-500" />
                      Testimonials Settings
                    </div>

                    {/* Scrollable Content */}
                    <div className="max-h-[350px] space-y-5 overflow-y-auto p-4">
                      {/* Animation Settings */}
                      <div className="space-y-4">
                        <h4 className="text-sm font-medium text-gray-800">
                          Animation Settings
                        </h4>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label
                              htmlFor="effect"
                              className="text-sm text-gray-600"
                            >
                              Transition Effect
                            </Label>
                            <select
                              id="effect"
                              value={effect}
                              onChange={(e) =>
                                handleEffectChange(e.target.value)
                              }
                              className="h-9 w-full rounded-md border border-gray-300 bg-white px-3 py-1 text-sm"
                            >
                              <option value="slide">Slide</option>
                              <option value="fade">Fade</option>
                              <option value="cards">Cards</option>
                            </select>
                            <div className="mt-1 text-xs text-gray-500">
                              {effect === 'slide' &&
                                'Slides smoothly from one testimonial to the next'}
                              {effect === 'fade' &&
                                'Fades smoothly between testimonials'}
                              {effect === 'cards' &&
                                'Stacks testimonials like cards'}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label
                              htmlFor="scrollSpeed"
                              className="text-sm text-gray-600"
                            >
                              Transition Speed (ms)
                            </Label>
                            <div className="flex items-center space-x-2">
                              <Input
                                id="scrollSpeed"
                                type="number"
                                value={scrollSpeed}
                                onChange={(e) =>
                                  handleScrollSpeedChange(e.target.value)
                                }
                                className="h-9"
                                min="100"
                                max="2000"
                                step="100"
                              />
                              <div className="whitespace-nowrap text-sm text-gray-500">
                                {scrollSpeed < 300
                                  ? 'Fast'
                                  : scrollSpeed > 800
                                    ? 'Slow'
                                    : 'Medium'}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                            <div>
                              <Label
                                htmlFor="autoScroll"
                                className="mb-1 block text-sm font-medium text-gray-700"
                              >
                                Auto Scroll
                              </Label>
                              <div className="text-xs text-gray-500">
                                Automatically transition between testimonials
                              </div>
                            </div>
                            <Switch
                              id="autoScroll"
                              checked={autoScroll}
                              onCheckedChange={handleAutoScrollChange}
                              className="data-[state=checked]:bg-blue-600"
                            />
                          </div>

                          {autoScroll && (
                            <div className="space-y-2">
                              <Label
                                htmlFor="autoScrollInterval"
                                className="text-sm text-gray-600"
                              >
                                Display Duration (ms)
                              </Label>
                              <div className="flex items-center space-x-2">
                                <Input
                                  id="autoScrollInterval"
                                  type="number"
                                  value={autoScrollInterval}
                                  onChange={(e) =>
                                    handleIntervalChange(e.target.value)
                                  }
                                  className="h-9"
                                  min="1000"
                                  max="10000"
                                  step="500"
                                />
                                <div className="whitespace-nowrap text-sm text-gray-500">
                                  {(autoScrollInterval / 1000).toFixed(1)}s
                                </div>
                              </div>
                              <div className="mt-1 text-xs text-gray-500">
                                Time each testimonial is displayed before
                                transitioning
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Fixed Footer */}
                    <div className="sticky bottom-0 z-20 border-t bg-gray-50 p-4">
                      <div className="flex justify-between gap-3">
                        <Button
                          variant="outline"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIsSettingsOpen(false);
                          }}
                          className="flex-1 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
                        >
                          <X className="mr-2 h-4 w-4" />
                          Cancel
                        </Button>
                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleSaveSettings();
                          }}
                          className="flex-1 bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700"
                        >
                          <Check className="mr-2 h-4 w-4" />
                          Apply Changes
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </TooltipTrigger>
              <TooltipContent className="border-gray-700 bg-black text-gray-200">
                <p>Settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </div>
  );
}
