/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Form, Input, Button, Select } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const { Option } = Select;

export default function ActivityForm({ onClose }: { onClose: () => void }) {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    // handle form submission
    onClose();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      className="space-y-6"
    >
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-semibold">Activity Details</span>
        <Button icon={<CloseOutlined />} onClick={onClose} type="text" />
      </div>
      {/* Created By */}
      <Form.Item
        label="Created By"
        name="createdBy"
        rules={[{ required: true, message: "Please select creator" }]}
      >
        <Select size="large" placeholder="Select creator">
          <Option value="test@padelmates.se">test@padelmates.se</Option>
        </Select>
      </Form.Item>
      {/* Start Time & End Time */}
      <div className="grid grid-cols-2 gap-4">
        <Form.Item
          label="Start Time"
          name="startTime"
          rules={[{ required: true, message: "Please select start time" }]}
        >
          <Select size="large" placeholder="Select Start Time">
            {Array.from({ length: 24 }, (_, i) => (
              <Option key={i} value={`${i.toString().padStart(2, "0")}:00`}>
                {`${i.toString().padStart(2, "0")}:00`}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="End Time"
          name="endTime"
          rules={[{ required: true, message: "Please select end time" }]}
        >
          <Select size="large" placeholder="Select End Time">
            {Array.from({ length: 24 }, (_, i) => (
              <Option key={i} value={`${i.toString().padStart(2, "0")}:00`}>
                {`${i.toString().padStart(2, "0")}:00`}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </div>
      {/* Activity Type */}
      <Form.Item
        label="Activity"
        name="activity"
        rules={[{ required: true, message: "Please select activity" }]}
      >
        <Select size="large" placeholder="Select Activity">
          <Option value="padel">Padel</Option>
          <Option value="tennis">Tennis</Option>
          <Option value="squash">Squash</Option>
        </Select>
      </Form.Item>
      {/* Add Players */}
      <Form.List name="players">
        {(fields, { add, remove }) => (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Add Players</span>
              <Button type="dashed" onClick={() => add()} size="small">
                Add Player
              </Button>
            </div>
            {fields.map((field) => (
              <div
                key={field.key}
                className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg"
              >
                <Form.Item
                  {...field}
                  name={[field.name, "name"]}
                  rules={[{ required: true, message: "Enter name" }]}
                  className="mb-0 flex-1"
                >
                  <Input placeholder="Player name" />
                </Form.Item>
                <Form.Item
                  {...field}
                  name={[field.name, "email"]}
                  rules={[{ required: true, message: "Enter email" }]}
                  className="mb-0 flex-1"
                >
                  <Input placeholder="Player email" />
                </Form.Item>
                <Button type="text" danger onClick={() => remove(field.name)}>
                  Remove
                </Button>
              </div>
            ))}
          </div>
        )}
      </Form.List>
      {/* Recurrent Activity */}
      <Form.Item name="isRecurrent" valuePropName="checked">
        <Input type="checkbox" /> Recurrent Activity?
      </Form.Item>
      {/* Courts */}
      <Form.Item label="Courts" name="courts">
        <Select size="large" placeholder="Select Courts">
          <Option value="court-1">Court 1</Option>
          <Option value="court-2">Court 2</Option>
          <Option value="court-3">Court 3</Option>
        </Select>
      </Form.Item>
      {/* Booking Check In */}
      <div className="space-y-2">
        <span className="text-sm font-medium">Booking Check In</span>
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">
            Check-in information will be displayed here
          </p>
        </div>
      </div>
      {/* Cancellation Time & Door Code */}
      <div className="grid grid-cols-2 gap-4">
        <Form.Item label="Cancellation Time (Hours)" name="cancellationHours">
          <Input type="number" min={1} placeholder="24" />
        </Form.Item>
        <Form.Item label="Door Code" name="doorCode">
          <Input placeholder="Door Code" />
        </Form.Item>
      </div>
      {/* Total Price & Discount */}
      <div className="grid grid-cols-2 gap-4">
        <Form.Item
          label="Total Price"
          name="totalPrice"
          rules={[{ required: true, message: "Enter total price" }]}
        >
          <Input type="number" prefix="$" placeholder="0" />
        </Form.Item>
        <Form.Item label="Discount" name="discount">
          <Input type="number" suffix="%" placeholder="0" />
        </Form.Item>
      </div>
      {/* Description */}
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: "Please enter description" }]}
      >
        <Input.TextArea rows={4} placeholder="Enter description" />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          className="w-full"
        >
          Create
        </Button>
      </Form.Item>
    </Form>
  );
}
