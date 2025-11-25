
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { accountProfile } from "@/lib/data";
import { Pencil } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export default function AccountPage() {
  const [isProfileEditing, setIsProfileEditing] = useState(false);
  const [isBankEditing, setIsBankEditing] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-3xl font-bold">Account Profile</h1>
        <p className="text-muted-foreground">Manage your personal and business information.</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-lg">
          <TabsTrigger value="profile">My Profile</TabsTrigger>
          <TabsTrigger value="license">License Details</TabsTrigger>
          <TabsTrigger value="bank">Bank Account</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle>Personal & Business Details</CardTitle>
                <CardDescription>
                  Update your contact and business information here.
                </CardDescription>
              </div>
              <Button variant="outline" size="icon" onClick={() => setIsProfileEditing(!isProfileEditing)}>
                <Pencil className="h-4 w-4" />
                <span className="sr-only">Edit Profile</span>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="storeId">Store ID</Label>
                    <Input id="storeId" defaultValue={accountProfile.licenseDetails.storeId} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={accountProfile.personalDetails.name} readOnly={!isProfileEditing} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input id="businessName" defaultValue={accountProfile.personalDetails.businessName} readOnly={!isProfileEditing} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue={accountProfile.personalDetails.email} readOnly={!isProfileEditing} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" defaultValue={accountProfile.personalDetails.phone} readOnly={!isProfileEditing} />
                </div>
              </div>
               <div className="space-y-2">
                <Label htmlFor="address">Store Full Address</Label>
                <Textarea id="address" defaultValue={accountProfile.personalDetails.address} readOnly={!isProfileEditing} rows={3} />
              </div>
            </CardContent>
            {isProfileEditing && (
              <CardFooter>
                <Button onClick={() => setIsProfileEditing(false)}>Save Changes</Button>
              </CardFooter>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="license">
          <Card>
            <CardHeader>
              <CardTitle>License Details</CardTitle>
              <CardDescription>
                View your store and legal license information. Contact support to update these details.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label htmlFor="storeId">Store ID</Label>
                    <Input id="storeId" defaultValue={accountProfile.licenseDetails.storeId} readOnly />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="gst">GST Number</Label>
                    <Input id="gst" defaultValue={accountProfile.licenseDetails.gst} readOnly />
                </div>
              </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="drugLicense">Drug License (DL)</Label>
                    <Input id="drugLicense" defaultValue={accountProfile.licenseDetails.drugLicense} readOnly />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="fssai">FSSAI License</Label>
                    <Input id="fssai" defaultValue={accountProfile.licenseDetails.fssai} readOnly />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bank">
          <Card>
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle>Bank Account Details</CardTitle>
                <CardDescription>
                  Manage the bank account linked for payments and settlements.
                </CardDescription>
              </div>
               <Button variant="outline" size="icon" onClick={() => setIsBankEditing(!isBankEditing)}>
                <Pencil className="h-4 w-4" />
                <span className="sr-only">Edit Bank Details</span>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bankName">Bank Name</Label>
                  <Input id="bankName" defaultValue={accountProfile.bankAccount.bankName} readOnly={!isBankEditing} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input id="accountNumber" defaultValue={accountProfile.bankAccount.accountNumber} readOnly={!isBankEditing} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ifsc">IFSC Code</Label>
                  <Input id="ifsc" defaultValue={accountProfile.bankAccount.ifsc} readOnly={!isBankEditing} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="branch">Branch</Label>
                  <Input id="branch" defaultValue={accountProfile.bankAccount.branch} readOnly={!isBankEditing} />
                </div>
              </div>
            </CardContent>
             {isBankEditing && (
              <CardFooter>
                <Button onClick={() => setIsBankEditing(false)}>Save Changes</Button>
              </CardFooter>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
