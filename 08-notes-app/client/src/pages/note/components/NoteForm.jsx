import React, { useState, useEffect } from "react";
import { Form, Input, Button, Tag, Select } from "antd";
import PropTypes from "prop-types";

const NoteForm = ({
  initialValues = {},
  categories = [],
  onSubmit,
  submitButtonText,
}) => {
  const [tags, setTags] = useState([]);
  const [inputTag, setInputTag] = useState("");
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues?.tags) {
      setTags(initialValues.tags);
    }
  }, [initialValues]);

  const handleInputTagChange = (e) => {
    setInputTag(e.target.value);
  };

  const handleAddTag = () => {
    if (inputTag && !tags.includes(inputTag)) {
      setTags([...tags, inputTag]);
      setInputTag("");
    }
  };

  const handleRemoveTag = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };

  const handleSubmit = (values) => {
    onSubmit({ ...values, tags });
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
      className="max-w-2xl mx-auto"
      initialValues={initialValues}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: "请输入笔记标题" }]}
      >
        <Input placeholder="请输入笔记标题" />
      </Form.Item>

      <Form.Item
        label="内容"
        name="content"
        rules={[{ required: true, message: "请输入笔记内容" }]}
      >
        <Input.TextArea rows={6} placeholder="请输入笔记内容" />
      </Form.Item>

      <Form.Item
        label="类型"
        name="categoryId"
        rules={[{ required: true, message: "请选择笔记类型" }]}
      >
        <Select placeholder="请选择笔记类型">
          {categories.map((category) => (
            <Select.Option key={category.id} value={category.id}>
              {category.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <div className="mb-4">
        <label className="block mb-2">标签</label>
        <div className="flex gap-2 mb-2">
          <Input
            value={inputTag}
            onChange={handleInputTagChange}
            placeholder="输入标签"
            onPressEnter={handleAddTag}
          />
          <Button onClick={handleAddTag}>添加标签</Button>
        </div>
        <div className="flex gap-2 flex-wrap">
          {tags.map((tag) => (
            <Tag key={tag} closable onClose={() => handleRemoveTag(tag)}>
              {tag}
            </Tag>
          ))}
        </div>
      </div>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {submitButtonText}
        </Button>
      </Form.Item>
    </Form>
  );
};

NoteForm.propTypes = {
  initialValues: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    categoryId: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }),
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  onSubmit: PropTypes.func.isRequired,
  submitButtonText: PropTypes.string.isRequired,
};
export default NoteForm;
