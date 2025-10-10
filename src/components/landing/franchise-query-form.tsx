"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle } from "lucide-react";
import { indianStates, franchiseReasons } from "@/lib/data";

const formSchema = z.object({
  applicantName: z.string().min(1, "Applicant name is required"),
  mobileNumber: z.string().length(10, "Mobile number must be 10 digits"),
  emailAddress: z.string().email("Invalid email address").optional().or(z.literal("")),
  state: z.string().min(1, "State is required"),
  district: z.string().min(1, "District is required"),
  city: z.string().min(1, "City/Town/Mandal is required"),
  pincode: z.string().length(6, "Pincode must be 6 digits"),
  franchiseeType: z.enum(["new", "converting"], {
    required_error: "You need to select a franchisee type.",
  }),
  investmentComfort: z.string().optional(),
  businessOperation: z.string().optional(),
  reason: z.string().optional(),
  storeSpace: z.string().optional(),
}).superRefine((data, ctx) => {
    if (data.franchiseeType === 'new') {
        if (!data.investmentComfort) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Investment comfort selection is required.", path: ['investmentComfort'] });
        }
        if (!data.businessOperation) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Business operation preference is required.", path: ['businessOperation'] });
        }
        if (!data.reason) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Reason for starting is required.", path: ['reason'] });
        }
    }
    if (data.franchiseeType === 'converting') {
         if (!data.storeSpace) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Store space availability is required.", path: ['storeSpace'] });
        }
        if (!data.investmentComfort) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Investment comfort selection is required.", path: ['investmentComfort'] });
        }
         if (!data.businessOperation) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Business operation preference is required.", path: ['businessOperation'] });
        }
        if (!data.reason) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Reason for starting is required.", path: ['reason'] });
        }
    }
});

type FranchiseQueryFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function FranchiseQueryForm({ open, onOpenChange }: FranchiseQueryFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      applicantName: "",
      mobileNumber: "",
      emailAddress: "",
      state: "",
      district: "",
      city: "",
      pincode: "",
    },
  });

  const selectedState = form.watch("state");
  const franchiseeType = form.watch("franchiseeType");

  useEffect(() => {
    form.resetField("district");
  }, [selectedState, form]);

  useEffect(() => {
    form.resetField("investmentComfort");
    form.resetField("businessOperation");
    form.resetField("reason");
    form.resetField("storeSpace");
  }, [franchiseeType, form]);
  
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    setIsSubmitted(true);
  };
  
  const handleClose = (open: boolean) => {
    onOpenChange(open);
    if (!open) {
        setTimeout(() => {
            setIsSubmitted(false);
            form.reset();
        }, 500);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-3xl">
        <ScrollArea className="max-h-[85vh]">
          <div className="p-6 pr-8">
            <DialogHeader>
              <DialogTitle className="font-headline text-2xl">
                Franchisee Query Form
              </DialogTitle>
              <DialogDescription>
                Please fill out the details below. Our team will get in touch with
                you shortly.
              </DialogDescription>
            </DialogHeader>
            {isSubmitted ? (
                <div className="flex flex-col items-center justify-center text-center py-12">
                    <CheckCircle className="h-16 w-16 text-green-500 mb-4"/>
                    <h3 className="text-xl font-bold mb-2">Inquiry Submitted!</h3>
                    <p className="text-muted-foreground">Thank you for your interest! Our Franchise Development Team will contact you soon.</p>
                </div>
            ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                    <FormField
                    control={form.control}
                    name="applicantName"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Name of the Applicant/Firm/Company*</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter full name" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="mobileNumber"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Mobile Number*</FormLabel>
                        <FormControl>
                            <Input type="tel" placeholder="Enter 10-digit mobile number" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="emailAddress"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                            <Input type="email" placeholder="Enter email address" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>

                <h3 className="text-lg font-semibold pt-2 border-b pb-2">Preferred Location</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                    <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>State*</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a state" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {indianStates.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="district"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>District*</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your district" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>City/Town/Mandal*</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your city/town" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="pincode"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Pincode*</FormLabel>
                            <FormControl>
                                <Input type="tel" placeholder="Enter 6-digit pincode" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="franchiseeType"
                    render={({ field }) => (
                        <FormItem className="space-y-3 pt-4">
                        <FormLabel>Franchisee Type*</FormLabel>
                        <FormControl>
                            <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4"
                            >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                <RadioGroupItem value="new" />
                                </FormControl>
                                <FormLabel className="font-normal">Open New Store</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                <RadioGroupItem value="converting" />
                                </FormControl>
                                <FormLabel className="font-normal">Converting Existing Store</FormLabel>
                            </FormItem>
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                
                {franchiseeType === 'new' && (
                     <div className="space-y-4 p-4 border rounded-md">
                        <FormField
                            control={form.control}
                            name="investmentComfort"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                <FormLabel>Are you comfortable to invest INR 10-15L to start your own pharmacy?*</FormLabel>
                                <FormControl>
                                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl><RadioGroupItem value="help" /></FormControl>
                                            <FormLabel className="font-normal">I can if I get help in finance/loan</FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl><RadioGroupItem value="yes" /></FormControl>
                                            <FormLabel className="font-normal">Yes</FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl><RadioGroupItem value="no" /></FormControl>
                                            <FormLabel className="font-normal">No</FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="businessOperation"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                <FormLabel>How are you planning to run the business?*</FormLabel>
                                <FormControl>
                                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                                         <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl><RadioGroupItem value="self" /></FormControl>
                                            <FormLabel className="font-normal">I would be myself sitting at the store every day</FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl><RadioGroupItem value="staff" /></FormControl>
                                            <FormLabel className="font-normal">I would hire staff to manage</FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="reason"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Reason for Starting MedPlus Pharmacy*</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a reason" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {franchiseReasons.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                )}
                
                 {franchiseeType === 'converting' && (
                     <div className="space-y-4 p-4 border rounded-md">
                         <FormField
                            control={form.control}
                            name="storeSpace"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                <FormLabel>Do you have a store more than 250 sqft area to open MedPlus pharmacy?*</FormLabel>
                                <FormControl>
                                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl><RadioGroupItem value="yes" /></FormControl>
                                            <FormLabel className="font-normal">Yes</FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl><RadioGroupItem value="no" /></FormControl>
                                            <FormLabel className="font-normal">No</FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="investmentComfort"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                <FormLabel>Are you comfortable to invest INR 10-12L to start your pharmacy?*</FormLabel>
                                <FormControl>
                                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl><RadioGroupItem value="yes" /></FormControl>
                                            <FormLabel className="font-normal">Yes</FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl><RadioGroupItem value="no" /></FormControl>
                                            <FormLabel className="font-normal">No</FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="businessOperation"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                <FormLabel>How are you planning to run the business?*</FormLabel>
                                <FormControl>
                                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                                         <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl><RadioGroupItem value="self" /></FormControl>
                                            <FormLabel className="font-normal">I would be myself sitting at the store every day</FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl><RadioGroupItem value="staff" /></FormControl>
                                            <FormLabel className="font-normal">I would hire staff to manage</FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="reason"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Reason for Starting MedPlus Pharmacy*</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a reason" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {franchiseReasons.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                )}
                <DialogFooter className="pt-4">
                    <Button type="submit">Submit Inquiry</Button>
                </DialogFooter>
              </form>
            </Form>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
