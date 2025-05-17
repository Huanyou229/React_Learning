import React, { useState } from "react";
import { Modal, Form, Input, message, Upload, Button } from "antd";
import { PlusOutlined, BookFilled, DeleteOutlined } from "@ant-design/icons";
import { createCategory } from "@/api/categoryApi";
import PropTypes from "prop-types";
import { uploadFile } from "@/api/uploadApi";
import { useStore } from "@/store/userStore";
const CreateCategory = ({ open, onCancel, onSuccess }) => {
  const [form] = Form.useForm();
  const [coverUrl, setCoverUrl] = useState("");
  const { user } = useStore();

  const handleUpload = async ({ file }) => {
    try {
      const res = await uploadFile(file); // 使用抽取后的通用接口
      setCoverUrl(res.url);
      message.success("封面上传成功");
    } catch (err) {
      message.error("上传失败：" + err.message);
    }
  };

  const handleRemoveCover = () => {
    setCoverUrl("");
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const categoryData = {
        ...values,
        userId: user.id,
        cover: coverUrl,
      };
      await createCategory(categoryData);
      message.success("知识库创建成功");
      form.resetFields();
      setCoverUrl("");
      onCancel();
      if (onSuccess) onSuccess();
    } catch (error) {
      message.error("创建失败：" + error.message);
    }
  };

  return (
    <Modal
      open={open}
      title="新建知识库"
      okText="确定"
      cancelText="取消"
      onCancel={onCancel}
      onOk={handleSubmit}
      className="w-96"
      centered
    >
      <Form form={form} layout="vertical" className="mt-4 space-y-3">
        <Form.Item
          name="name"
          label="知识库名称"
          rules={[{ required: true, message: "请输入知识库名称" }]}
        >
          <Input
            placeholder="请输入知识库名称"
            prefix={
              <BookFilled style={{ color: "#679ff4", fontSize: "20px" }} />
            }
          />
        </Form.Item>

        <Form.Item name="description" label="描述">
          <Input.TextArea placeholder="知识库描述（选填）" rows={3} />
        </Form.Item>

        <Form.Item label="封面上传">
          <Upload
            name="file"
            customRequest={handleUpload}
            showUploadList={false}
            accept="image/*"
          >
            {coverUrl ? (
              <>
                <div className="w-full h-32 border border-dashed border-gray-300 flex items-center justify-center rounded hover:border-blue-400">
                  <img
                    src={coverUrl}
                    alt="封面"
                    className="w-full h-20 rounded shadow"
                  />
                </div>
                <div className="flex justify-center mt-2">
                  <Button
                    type="primary"
                    style={{ width: "50%" }}
                    className="text-white cursor-pointer"
                    onClick={handleRemoveCover}
                  >
                    <DeleteOutlined />
                  </Button>
                </div>
              </>
            ) : (
              <div className="w-full h-32 border border-dashed border-gray-300 flex items-center justify-center rounded hover:border-blue-400">
                <PlusOutlined />
                <span className="ml-2">点击上传封面</span>
              </div>
            )}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

CreateCategory.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
};

export default CreateCategory;
