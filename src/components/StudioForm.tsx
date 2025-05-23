
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  CameraIcon, 
  CalendarIcon, 
  InfoIcon,
  MapPinIcon,
  MicIcon,
  VideoIcon,
  WifiIcon,
  UploadIcon,
  ImageIcon,
  GalleryHorizontalIcon,
  YoutubeIcon,
  LinkIcon
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

// Define form schema with zod
const formSchema = z.object({
  // Basic Details
  studioName: z.string().min(3, { message: "Studio name must be at least 3 characters" }),
  tagline: z.string().min(5, { message: "Tagline must be at least 5 characters" }),
  location: z.string().min(10, { message: "Please provide complete address with landmark" }),
  nearestStation: z.string().min(2, { message: "Please specify nearest station" }),
  studioType: z.enum(["podcast", "video", "hybrid", "editing"]),
  
  // Equipment
  equipment: z.object({
    proMics: z.boolean().default(false),
    mixer: z.boolean().default(false),
    soundproofing: z.boolean().default(false),
    cameras4k: z.boolean().default(false),
    lights: z.boolean().default(false),
    greenScreen: z.boolean().default(false),
    teleprompter: z.boolean().default(false),
    wifi: z.boolean().default(false),
    ac: z.boolean().default(false),
    refreshments: z.boolean().default(false),
  }),
  
  // Room Details
  capacity: z.number().min(1).max(20),
  backdropOptions: z.array(z.string()).optional(),
  
  // Add-on Services
  addOns: z.object({
    equipmentRentals: z.boolean().default(false),
    equipmentRentalsDetails: z.string().optional(),
    onDemandStaff: z.boolean().default(false),
    onDemandStaffDetails: z.string().optional(),
    liveStreaming: z.boolean().default(false),
    liveStreamingDetails: z.string().optional(),
  }),
  
  // Pricing
  hourlyRate: z.number().min(100),
  discounts: z.object({
    packages: z.boolean().default(false),
    packagesDetails: z.string().optional(),
    offPeakRates: z.boolean().default(false),
    offPeakRatesDetails: z.string().optional(),
  }),
  
  // Studio Rules
  cancellationPolicy: z.enum(["free24h", "partial", "custom"]),
  cancellationPolicyDetails: z.string().optional(),
  restrictions: z.array(z.string()).optional(),
  customRestrictions: z.string().optional(),
  
  // Marketing
  verificationBadges: z.array(z.string()).optional(),
  promotedListing: z.boolean().default(false),
  promotionKeywords: z.string().optional(),
  
  // Sample Content
  sampleContent: z.string().optional(),
  
  // YouTube Videos
  youtubeLinks: z.array(z.string().url("Please enter a valid YouTube URL").optional()).optional(),
  
  // Terms
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the terms to continue",
  }),
  allowPromotion: z.boolean().default(false),
});

type StudioFormProps = {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  isSubmitting: boolean;
};

const StudioForm = ({ onSubmit, isSubmitting }: StudioFormProps) => {
  const [images, setImages] = useState<File[]>([]);
  const [virtualTour, setVirtualTour] = useState<File | null>(null);
  const [youtubeLinks, setYoutubeLinks] = useState<string[]>(['']);
  
  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studioType: "podcast",
      equipment: {
        proMics: false,
        mixer: false,
        soundproofing: false,
        cameras4k: false,
        lights: false,
        greenScreen: false,
        teleprompter: false,
        wifi: false,
        ac: false,
        refreshments: false,
      },
      capacity: 3,
      backdropOptions: [],
      addOns: {
        equipmentRentals: false,
        onDemandStaff: false,
        liveStreaming: false,
      },
      hourlyRate: 800,
      discounts: {
        packages: false,
        offPeakRates: false,
      },
      cancellationPolicy: "free24h",
      restrictions: [],
      verificationBadges: [],
      promotedListing: false,
      sampleContent: "",
      youtubeLinks: [''],
      termsAccepted: false,
      allowPromotion: false,
    },
  });
  
  // Handle image uploads
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImages(prev => [...prev, ...Array.from(files)]);
    }
  };
  
  // Handle virtual tour upload
  const handleVirtualTourUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVirtualTour(file);
    }
  };

  // Handle YouTube links
  const addYoutubeLink = () => {
    setYoutubeLinks([...youtubeLinks, '']);
    form.setValue('youtubeLinks', [...(form.getValues().youtubeLinks || []), '']);
  };

  const removeYoutubeLink = (index: number) => {
    const newLinks = youtubeLinks.filter((_, i) => i !== index);
    setYoutubeLinks(newLinks);
    form.setValue('youtubeLinks', newLinks);
  };

  const updateYoutubeLink = (value: string, index: number) => {
    const newLinks = [...youtubeLinks];
    newLinks[index] = value;
    setYoutubeLinks(newLinks);
    form.setValue(`youtubeLinks.${index}` as any, value);
  };
  
  // Backdrop options
  const backdropOptions = [
    { id: "plain", label: "Plain Wall / Neutral Colors", icon: ImageIcon },
    { id: "bookshelf", label: "Bookshelf / Library Theme", icon: GalleryHorizontalIcon },
    { id: "cityscape", label: "Urban Cityscape", icon: ImageIcon },
    { id: "greenScreen", label: "Customizable Green Screen", icon: VideoIcon },
  ];
  
  // Restrictions options
  const restrictionOptions = [
    { id: "noFood", label: "No food/drinks in the recording area" },
    { id: "noLoudMusic", label: "No loud music after 10 PM" },
    { id: "noSmoking", label: "No smoking on premises" },
    { id: "noPets", label: "No pets allowed" },
  ];
  
  // Badge options
  const badgeOptions = [
    { id: "equipmentCertified", label: "Equipment Certified" },
    { id: "topRated", label: "Apply for Top Rated status" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Section 1: Basic Studio Details */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xs border">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <InfoIcon className="h-5 w-5 text-primary" />
            Basic Studio Details
          </h2>
          
          <div className="grid gap-6 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="studioName"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Studio Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Bookworm Podcast Studio – Mumbai" {...field} />
                  </FormControl>
                  <FormDescription>
                    Create a memorable name that includes your location
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="tagline"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Tagline</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Quiet, Book-Themed Studio for Authors & Readers" {...field} />
                  </FormControl>
                  <FormDescription>
                    A brief description of your studio's theme or specialty
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Full address + landmark" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="nearestStation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nearest Metro/Station</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Andheri West (2km)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="studioType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Studio Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select studio type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="podcast">Podcast Studio</SelectItem>
                      <SelectItem value="video">Video Recording Studio</SelectItem>
                      <SelectItem value="hybrid">Hybrid (Audio + Video)</SelectItem>
                      <SelectItem value="editing">Editing Suite</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        {/* Section 2: Studio Features & Amenities */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xs border">
          <h2 className="text-xl font-semibold mb-4">Studio Features & Amenities</h2>
          
          <h3 className="text-lg font-medium mb-3">A. Equipment Checklist</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-1">
                <MicIcon className="h-4 w-4" /> Audio
              </h4>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="equipment.proMics"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Professional Mics (Shure, Rode)</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="equipment.mixer"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Mixer/Podcast Console</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="equipment.soundproofing"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Soundproofing</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-1">
                <VideoIcon className="h-4 w-4" /> Video
              </h4>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="equipment.cameras4k"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>4K Cameras (Sony, Canon)</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="equipment.lights"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Ring Lights/Softboxes</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="equipment.greenScreen"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Green Screen</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="equipment.teleprompter"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Teleprompter</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Other</h4>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="equipment.wifi"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>High-Speed Wi-Fi</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="equipment.ac"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Air Conditioning</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="equipment.refreshments"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Refreshments (Snacks/Water)</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          
          <h3 className="text-lg font-medium mb-3">B. Room Details</h3>
          <div className="grid gap-6 sm:grid-cols-2 mb-6">
            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capacity (Max. number of guests)</FormLabel>
                  <div className="space-y-2">
                    <FormControl>
                      <Slider
                        min={1}
                        max={20}
                        step={1}
                        value={[field.value]}
                        onValueChange={(vals) => field.onChange(vals[0])}
                      />
                    </FormControl>
                    <div className="flex justify-between text-sm">
                      <span>1 person</span>
                      <span>{field.value} {field.value === 1 ? 'person' : 'people'}</span>
                      <span>20 people</span>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div>
              <FormLabel className="block mb-2">Backdrop Options</FormLabel>
              <div className="space-y-2">
                {backdropOptions.map((option) => (
                  <FormField
                    key={option.id}
                    control={form.control}
                    name="backdropOptions"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={option.id}
                          className="flex items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(option.id)}
                              onCheckedChange={(checked) => {
                                const updatedValue = checked
                                  ? [...(field.value || []), option.id]
                                  : field.value?.filter(
                                      (value) => value !== option.id
                                    ) || [];
                                field.onChange(updatedValue);
                              }}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm font-normal flex items-center gap-1">
                              <option.icon className="h-4 w-4" />
                              {option.label}
                            </FormLabel>
                          </div>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <h3 className="text-lg font-medium mb-3">C. Add-On Services</h3>
          <div className="space-y-4 mb-4">
            <FormField
              control={form.control}
              name="addOns.equipmentRentals"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <div className="flex items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Equipment Rentals</FormLabel>
                      <FormDescription>
                        Additional equipment available for rent
                      </FormDescription>
                    </div>
                  </div>
                  
                  {field.value && (
                    <FormField
                      control={form.control}
                      name="addOns.equipmentRentalsDetails"
                      render={({ field }) => (
                        <FormItem className="ml-7">
                          <FormControl>
                            <Textarea
                              placeholder="e.g., Extra mic: ₹200/hr, Portable recorder: ₹500/day"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="addOns.onDemandStaff"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <div className="flex items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>On-Demand Staff</FormLabel>
                      <FormDescription>
                        Professional staff available on request
                      </FormDescription>
                    </div>
                  </div>
                  
                  {field.value && (
                    <FormField
                      control={form.control}
                      name="addOns.onDemandStaffDetails"
                      render={({ field }) => (
                        <FormItem className="ml-7">
                          <FormControl>
                            <Textarea
                              placeholder="e.g., Sound engineer: ₹1000/hr, Videographer: ₹1500/hr"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="addOns.liveStreaming"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <div className="flex items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Live Streaming Setup</FormLabel>
                      <FormDescription>
                        Equipment and support for live streaming
                      </FormDescription>
                    </div>
                  </div>
                  
                  {field.value && (
                    <FormField
                      control={form.control}
                      name="addOns.liveStreamingDetails"
                      render={({ field }) => (
                        <FormItem className="ml-7">
                          <FormControl>
                            <Textarea
                              placeholder="e.g., Basic YouTube streaming: ₹500, Multi-platform streaming: ₹1200"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </FormItem>
              )}
            />
          </div>
        </div>
        
        {/* Section 3: Pricing & Discounts */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xs border">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-primary" />
            Pricing & Discounts
          </h2>
          
          <div className="grid gap-6 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="hourlyRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hourly Rate (₹)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min={100}
                      placeholder="e.g., 800"
                      {...field} 
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>
                    Set your base hourly rate (₹)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="sm:col-span-2">
              <h3 className="text-lg font-medium mb-3">Discounts</h3>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="discounts.packages"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <div className="flex items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Weekly/Monthly Packages</FormLabel>
                        </div>
                      </div>
                      
                      {field.value && (
                        <FormField
                          control={form.control}
                          name="discounts.packagesDetails"
                          render={({ field }) => (
                            <FormItem className="ml-7">
                              <FormControl>
                                <Textarea
                                  placeholder="e.g., 10 hours for ₹8,000 (save ₹2,000)"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="discounts.offPeakRates"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <div className="flex items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Off-Peak Rates</FormLabel>
                        </div>
                      </div>
                      
                      {field.value && (
                        <FormField
                          control={form.control}
                          name="discounts.offPeakRatesDetails"
                          render={({ field }) => (
                            <FormItem className="ml-7">
                              <FormControl>
                                <Textarea
                                  placeholder="e.g., 20% off on weekdays before 4 PM"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Section 4: Media Upload */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xs border">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <CameraIcon className="h-5 w-5 text-primary" />
            Media Upload
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">A. Studio Photos</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                Upload at least 5 images of your studio (entrance, equipment, seating, backdrops)
              </p>
              
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative aspect-video bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden">
                      <img 
                        src={URL.createObjectURL(image)} 
                        alt={`Studio preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                        onClick={() => setImages(images.filter((_, i) => i !== index))}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ))}
                  
                  <div className="aspect-video bg-gray-50 dark:bg-gray-800 rounded-md border-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer">
                    <UploadIcon className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {images.length === 0 ? "Upload studio photos" : "Add more photos"}
                    </p>
                    <input 
                      type="file"
                      accept="image/*"
                      multiple
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>
                
                {images.length < 5 && (
                  <p className="text-amber-600 dark:text-amber-400 text-sm">
                    Please upload at least 5 photos of your studio
                  </p>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">B. Virtual Tour (Optional)</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                Upload a 360° video or panoramic photo
              </p>
              
              <div className="flex flex-col gap-2">
                {virtualTour ? (
                  <div className="relative aspect-video bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-sm">Virtual tour file: {virtualTour.name}</p>
                    </div>
                    <button
                      type="button"
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                      onClick={() => setVirtualTour(null)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="aspect-video max-w-md bg-gray-50 dark:bg-gray-800 rounded-md border-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer">
                    <UploadIcon className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Upload virtual tour (optional)
                    </p>
                    <input 
                      type="file"
                      accept="video/*,image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleVirtualTourUpload}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* NEW SECTION: YouTube Videos */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xs border">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <YoutubeIcon className="h-5 w-5 text-red-600" />
            Previous Podcast Videos
          </h2>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Share your studio's previous podcast videos to showcase your work quality
          </p>
          
          <div className="space-y-4">
            {youtubeLinks.map((link, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <YoutubeIcon className="h-4 w-4 text-red-600" />
                    <span className="text-sm font-medium">YouTube Link {index + 1}</span>
                  </div>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="e.g., https://youtube.com/watch?v=abcdef"
                      value={link}
                      onChange={(e) => updateYoutubeLink(e.target.value, index)}
                      className="flex-1"
                    />
                    <Button 
                      type="button" 
                      variant="destructive" 
                      size="sm"
                      onClick={() => removeYoutubeLink(index)}
                      disabled={youtubeLinks.length === 1}
                      className="h-10 px-3"
                    >
                      Remove
                    </Button>
                  </div>
                  {form.formState.errors.youtubeLinks?.[index] && (
                    <p className="text-sm font-medium text-destructive mt-1">
                      Please enter a valid YouTube URL
                    </p>
                  )}
                </div>
              </div>
            ))}
            
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addYoutubeLink}
              className="mt-2 flex items-center gap-2"
            >
              <LinkIcon className="h-4 w-4" />
              Add Another YouTube Link
            </Button>
          </div>
        </div>
        
        {/* Section 5: Submit */}
        <div className="flex justify-end gap-3">
          <Button 
            type="submit"
            disabled={isSubmitting}
            className="min-w-32"
          >
            {isSubmitting ? "Submitting..." : "Submit Studio"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default StudioForm;

