import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Upload, Button, message } from "antd";
import { UploadOutlined, DeleteOutlined, BookFilled } from "@ant-design/icons";
import PropTypes from "prop-types";
import { uploadFile } from "@/api/uploadApi";

const EditCategory = ({ visible, category, onCancel, onConfirm }) => {
  const [form] = Form.useForm();
  const [coverUrl, setCoverUrl] = useState("");

  useEffect(() => {
    if (category) {
      form.setFieldsValue({
        name: category.name || "",
        description: category.description || "",
      });
      setCoverUrl(category.cover || "");
    }
  }, [category]);

  const handleUpload = async ({ file }) => {
    try {
      const res = await uploadFile(file);
      setCoverUrl(res.url);
      message.success("上传成功");
    } catch (err) {
      console.error("上传失败", err);
      message.error("上传失败");
    }
  };

  const handleRemoveCover = () => {
    setCoverUrl("");
  };

  const handleOk = () => {
    const { name, description } = form.getFieldsValue();
    if (!name.trim()) {
      message.warning("名称不能为空");
      return;
    }
    onConfirm({
      id: category.id,
      name: name.trim(),
      description: description.trim(),
      cover: coverUrl,
    });
  };

  return (
    <Modal
      title="编辑知识库"
      okText="保存"
      cancelText="取消"
      open={visible}
      onCancel={onCancel}
      onOk={handleOk}
      centered={true}
    >
      <Form form={form} layout="vertical" className=" mt-4 space-y-3">
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
                <UploadOutlined />
                <span className="ml-2">点击上传封面</span>
              </div>
            )}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

EditCategory.propTypes = {
  visible: PropTypes.bool.isRequired,
  category: PropTypes.object,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default EditCategory;
