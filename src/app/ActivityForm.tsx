/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Plus, Minus, Bell, ToggleLeft, ToggleRight } from "lucide-react";

interface Player {
  name: string;
  email: string;
}

interface FormData {
  createdBy: string;
  startTime: string;
  endTime: string;
  activity: string;
  players: Player[];
  isRecurrent: boolean;
  bookingCheckIn: boolean;
  courts: string;
  cancellationHours: number;
  doorCode: string;
  totalPrice: number;
  discount: number;
  description: string;
}

export default function ActivityForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState<FormData>({
    createdBy: "",
    startTime: "",
    endTime: "",
    activity: "",
    players: [],
    isRecurrent: false,
    bookingCheckIn: false,
    courts: "",
    cancellationHours: 24,
    doorCode: "",
    totalPrice: 0,
    discount: 0,
    description: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );
  const [isVisible, setIsVisible] = useState(false);

  // Trigger animation after component mounts
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const addPlayer = () => {
    setFormData((prev) => ({
      ...prev,
      players: [...prev.players, { name: "", email: "" }],
    }));
  };

  const removePlayer = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      players: prev.players.filter((_, i) => i !== index),
    }));
  };

  const updatePlayer = (index: number, field: keyof Player, value: string) => {
    setFormData((prev) => ({
      ...prev,
      players: prev.players.map((player, i) =>
        i === index ? { ...player, [field]: value } : player
      ),
    }));
  };

  const toggleRecurrent = () => {
    setFormData((prev) => ({
      ...prev,
      isRecurrent: !prev.isRecurrent,
    }));
  };

  const toggleBookingCheckIn = () => {
    setFormData((prev) => ({
      ...prev,
      bookingCheckIn: !prev.bookingCheckIn,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.createdBy) newErrors.createdBy = "Please select creator";
    if (!formData.startTime) newErrors.startTime = "Please select start time";
    if (!formData.endTime) newErrors.endTime = "Please select end time";
    if (!formData.activity) newErrors.activity = "Please select activity";
    if (!formData.totalPrice) newErrors.totalPrice = "Enter total price";
    if (!formData.description)
      newErrors.description = "Please enter description";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onFinish = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      // handle form submission
      onClose();
    }
  };

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing/selecting
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <form onSubmit={onFinish} className="space-y-6">
      {/* Created By */}
      <div
        className={`space-y-2 transition-all duration-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        } delay-200`}
      >
        <Label className="text-sm font-medium">
          Created By<span className="text-[#03F181]">*</span>
        </Label>
        <Select
          value={formData.createdBy}
          onValueChange={(value) => updateFormData("createdBy", value)}
        >
          <SelectTrigger
            className={`transition-all duration-200 border border-[#E7E8E9] rounded-full mt-2 placeholder:text-gray-400 ${
              errors.createdBy ? "border-red-500" : ""
            }`}
          >
            <SelectValue
              placeholder="Ex. test@padelmates.se"
              className="text-gray-400"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="test@padelmates.se">
              test@padelmates.se
            </SelectItem>
          </SelectContent>
        </Select>
        {errors.createdBy && (
          <p className="text-sm text-red-500 animate-in slide-in-from-left duration-200">
            {errors.createdBy}
          </p>
        )}
      </div>

      {/* Start Time & End Time */}
      <div
        className={`grid grid-cols-2 gap-4 transition-all duration-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        } delay-300`}
      >
        <div className="space-y-2">
          <Label className="text-sm font-medium">
            Start Time<span className="text-[#03F181]">*</span>
          </Label>
          <Select
            value={formData.startTime}
            onValueChange={(value) => updateFormData("startTime", value)}
          >
            <SelectTrigger
              className={`transition-all duration-200 border border-[#E7E8E9] rounded-full mt-2 placeholder:text-gray-400 ${
                errors.startTime ? "border-red-500" : ""
              }`}
            >
              <SelectValue
                placeholder="Select Start Time"
                className="text-gray-400"
              />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 24 }, (_, i) => (
                <SelectItem
                  key={i}
                  value={`${i.toString().padStart(2, "0")}:00`}
                >
                  {`${i.toString().padStart(2, "0")}:00`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.startTime && (
            <p className="text-sm text-red-500 animate-in slide-in-from-left duration-200">
              {errors.startTime}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">
            End Time <span className="text-[#03F181]">*</span>
          </Label>
          <Select
            value={formData.endTime}
            onValueChange={(value) => updateFormData("endTime", value)}
          >
            <SelectTrigger
              className={`transition-all duration-200 border border-[#E7E8E9] rounded-full mt-2 placeholder:text-gray-400 ${
                errors.endTime ? "border-red-500" : ""
              }`}
            >
              <SelectValue
                placeholder="Select End Time"
                className="text-gray-400"
              />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 24 }, (_, i) => (
                <SelectItem
                  key={i}
                  value={`${i.toString().padStart(2, "0")}:00`}
                >
                  {`${i.toString().padStart(2, "0")}:00`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.endTime && (
            <p className="text-sm text-red-500 animate-in slide-in-from-left duration-200">
              {errors.endTime}
            </p>
          )}
        </div>
      </div>

      {/* Activity Type */}
      <div
        className={`space-y-2 transition-all duration-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        } delay-400`}
      >
        <Label className="text-sm font-medium">
          Choose Activity<span className="text-[#03F181]">*</span>
        </Label>
        <Select
          value={formData.activity}
          onValueChange={(value) => updateFormData("activity", value)}
        >
          <SelectTrigger
            className={`transition-all duration-200 border border-[#E7E8E9] rounded-full mt-2 placeholder:text-gray-400 ${
              errors.activity ? "border-red-500" : ""
            }`}
          >
            <SelectValue
              placeholder="Select Activity"
              className="text-gray-400"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="padel">Padel</SelectItem>
            <SelectItem value="tennis">Tennis</SelectItem>
            <SelectItem value="squash">Squash</SelectItem>
          </SelectContent>
        </Select>
        {errors.activity && (
          <p className="text-sm text-red-500 animate-in slide-in-from-left duration-200">
            {errors.activity}
          </p>
        )}
      </div>

      {/* Add Players */}
      <div
        className={`space-y-3 transition-all duration-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        } delay-500`}
      >
        <div className="relative group">
          <Input
            placeholder="Add Players"
            readOnly
            className="pr-12 cursor-pointer hover:bg-gray-50 hover:border-[#10715A] transition-all duration-200 group-hover:shadow-sm border border-[#E7E8E9] rounded-full placeholder:text-gray-400"
            onClick={addPlayer}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={addPlayer}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0 bg-[#03F181] rounded-full hover:bg-[#10715A] hover:text-white transition-all duration-200 group-hover:bg-[#10715A] group-hover:text-white"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {formData.players.map((player, index) => (
          <div
            key={index}
            className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg animate-in slide-in-from-bottom duration-300"
          >
            <div className="flex-1 space-y-2">
              <Input
                placeholder="Player name"
                value={player.name}
                onChange={(e) => updatePlayer(index, "name", e.target.value)}
                className="transition-all duration-200 focus:ring-2 focus:ring-[#10715A] border border-[#E7E8E9] rounded-full placeholder:text-gray-400"
              />
              <Input
                placeholder="Player email"
                value={player.email}
                onChange={(e) => updatePlayer(index, "email", e.target.value)}
                className="transition-all duration-200 focus:ring-2 focus:ring-[#10715A] border border-[#E7E8E9] rounded-full placeholder:text-gray-400"
              />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removePlayer(index)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors duration-200"
            >
              <Minus className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      {/* Recurrent Activity */}
      <div
        className={`space-y-3 transition-all duration-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        } delay-600`}
      >
        <div className="relative group">
          <Input
            placeholder="Recurrent Activity?"
            readOnly
            value={formData.isRecurrent ? "Recurring booking enabled" : ""}
            className={`pr-12 cursor-pointer hover:bg-gray-50 hover:border-[#10715A] transition-all duration-200 group-hover:shadow-sm border border-[#E7E8E9] rounded-full placeholder:text-gray-400 ${
              formData.isRecurrent ? "bg-green-50 border-green-200" : ""
            }`}
            onClick={toggleRecurrent}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={toggleRecurrent}
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0 rounded-full transition-all duration-200 ${
              formData.isRecurrent
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gray-100 group-hover:bg-[#10715A] group-hover:text-white"
            }`}
          >
            {formData.isRecurrent ? (
              <ToggleRight className="w-4 h-4" />
            ) : (
              <ToggleLeft className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Choose Multiple Courts */}
      <div
        className={`space-y-2 transition-all duration-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        } delay-700`}
      >
        <Label className="text-sm font-medium">Choose Multiple Courts</Label>
        <Select
          value={formData.courts}
          onValueChange={(value) => updateFormData("courts", value)}
        >
          <SelectTrigger className="border border-[#E7E8E9] rounded-full mt-2 placeholder:text-gray-400">
            <SelectValue
              placeholder="Select Courts"
              className="text-gray-400"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="court-1">Court 1</SelectItem>
            <SelectItem value="court-2">Court 2</SelectItem>
            <SelectItem value="court-3">Court 3</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Booking Check In */}
      <div
        className={`space-y-3 transition-all duration-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        } delay-800`}
      >
        <div className="relative group">
          <Input
            placeholder="Booking Check In"
            readOnly
            value={formData.bookingCheckIn ? "Check-in enabled" : ""}
            className={`pr-12 cursor-pointer hover:bg-gray-50 hover:border-[#10715A] transition-all duration-200 group-hover:shadow-sm border border-[#E7E8E9] rounded-full placeholder:text-gray-400 ${
              formData.bookingCheckIn ? "bg-blue-50 border-blue-200" : ""
            }`}
            onClick={toggleBookingCheckIn}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={toggleBookingCheckIn}
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0 rounded-full transition-all duration-200 ${
              formData.bookingCheckIn
                ? "bg-[#03F181] text-white hover:bg-green-600"
                : "bg-gray-100 group-hover:bg-[#10715A] group-hover:text-white"
            }`}
          >
            {formData.bookingCheckIn ? (
              <ToggleRight className="w-4 h-4" />
            ) : (
              <ToggleLeft className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Cancellation Time & Door Code */}
      <div
        className={`grid grid-cols-2 gap-4 transition-all duration-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        } delay-900`}
      >
        <div className="space-y-2">
          <Label className="text-sm font-medium">
            Cancellation Time (Hours)
          </Label>
          <div className="relative flex items-center">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  cancellationHours: Math.max(1, prev.cancellationHours - 1),
                }))
              }
              className="absolute left-1 z-10 h-6 w-6 p-0 border-none bg-transparent hover:bg-gray-100"
            >
              <Minus className="w-3 h-3" />
            </Button>
            <Input
              type="number"
              min={1}
              value={formData.cancellationHours.toString()}
              onChange={(e) =>
                updateFormData(
                  "cancellationHours",
                  parseInt(e.target.value) || 24
                )
              }
              className="border border-[#E7E8E9] rounded-full text-center px-8 placeholder:text-gray-400"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  cancellationHours: prev.cancellationHours + 1,
                }))
              }
              className="absolute right-1 z-10 h-6 w-6 p-0 border-none bg-transparent hover:bg-gray-100"
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium">Door Code</Label>
          <Input
            placeholder="Door Code"
            value={formData.doorCode}
            onChange={(e) => updateFormData("doorCode", e.target.value)}
            className="border border-[#E7E8E9] rounded-full placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Total Price & Discount */}
      <div
        className={`grid grid-cols-2 gap-4 transition-all duration-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        } delay-1000`}
      >
        <div className="space-y-2">
          <Label className="text-sm font-medium">
            Total price<span className="text-[#03F181]">*</span>
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              $
            </span>
            <Input
              type="number"
              placeholder="0"
              className={`pl-8 border border-[#E7E8E9] rounded-full placeholder:text-gray-400 ${
                errors.totalPrice ? "border-red-500" : ""
              }`}
              value={formData.totalPrice || ""}
              onChange={(e) =>
                updateFormData("totalPrice", parseFloat(e.target.value) || 0)
              }
            />
          </div>
          {errors.totalPrice && (
            <p className="text-sm text-red-500 animate-in slide-in-from-left duration-200">
              {errors.totalPrice}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium">Discount</Label>
          <div className="relative">
            <Input
              type="number"
              placeholder="0"
              className="pr-8 border border-[#E7E8E9] rounded-full placeholder:text-gray-400"
              value={formData.discount || ""}
              onChange={(e) =>
                updateFormData("discount", parseFloat(e.target.value) || 0)
              }
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              %
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div
        className={`transition-all duration-500 flex items-center justify-between gap-4 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        } delay-1100`}
      >
        <Button
          type="button"
          onClick={handleCancel}
          className="w-[180px] h-[50px] rounded-full bg-[#E7E8E9] hover:bg-gray-300 text-black transition-all duration-300"
          size="lg"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="w-[180px] h-[50px] rounded-full bg-[#03F181] hover:bg-[#02d171] text-black transition-all duration-300 hover:shadow-lg"
          size="lg"
        >
          Book Court
        </Button>
      </div>
    </form>
  );
}
