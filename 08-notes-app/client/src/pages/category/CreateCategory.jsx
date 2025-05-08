import React from "react";
import { Modal, Form, Input, message } from "antd";
import { createCategory } from "@/api/categoryApi";
import PropTypes from "prop-types";
import { BookFilled } from "@ant-design/icons";

const CreateCategory = ({ open, onCancel, onSuccess }) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await createCategory(values);
      message.success("知识库创建成功");
      form.resetFields();
      onCancel();
      if (onSuccess) onSuccess();
    } catch (error) {
      message.error("知识库创建失败：" + error.message);
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
      centered={true}
    >
      <Form form={form} layout="vertical" className="mt-4">
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
