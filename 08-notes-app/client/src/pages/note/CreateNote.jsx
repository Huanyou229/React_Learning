import React, { useState, useEffect, useRef } from "react";
import {
  Form,
  Input,
  Button,
  Tag,
  message,
  Select,
  Layout,
  Typography,
} from "antd";
import "@toast-ui/editor/dist/toastui-editor.css"; // Toast UI 样式
import { Editor } from "@toast-ui/react-editor"; // 引入 Toast UI 编辑器
import { createNote } from "@/api/noteApi";
import { getCategories } from "@/api/categoryApi";
import { useStore } from "@/store/userStore";
import { useNavigate } from "react-router-dom";

const { Header, Content } = Layout;
const { Title } = Typography;

const CreateNote = () => {
  const navigate = useNavigate();
  const { user } = useStore();
  const [tags, setTags] = useState([]);
  const [inputTag, setInputTag] = useState("");
  const [categories, setCategories] = useState([]);
  const [form] = Form.useForm();
  const editorRef = useRef(); // 用于获取编辑器内容

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories(user.id);
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        message.error("获取分类失败");
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (values) => {
    try {
      const content = editorRef.current
        ? editorRef.current.getInstance().getMarkdown()
        : "";
      const noteData = {
        ...values,
        tags,
        content,
        userId: user.id,
      };
      const response = await createNote(noteData);
      message.success("笔记创建成功");
      navigate(`/notes/categories/${response.data.categoryId}`);
    } catch (error) {
      console.error("Failed to create note:", error);
      message.error("创建笔记失败");
    }
  };

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
    setTags(tags.filter((tag) => tag !== removedTag));
  };

  return (
    <Layout>
      <Header className="bg-white shadow-md">
        <Title level={2} className="text-center">
          创建笔记
        </Title>
      </Header>
      <Content>
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          className="bg-white px-6 rounded-lg shadow-md py-2"
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: "请输入笔记标题" }]}
          >
            <Input placeholder="请输入笔记标题" />
          </Form.Item>

          <Form.Item label="内容" required>
            <Editor
              ref={editorRef}
              initialEditType="markdown"
              previewStyle="vertical"
              height="600px"
              placeholder="请输入笔记内容（支持 Markdown）"
              usageStatistics={false}
              hideModeSwitch={true}
            />
          </Form.Item>

          <Form.Item
            label="知识库"
            name="categoryId"
            rules={[{ required: true, message: "请选择笔记所属的知识库" }]}
          >
            <Select placeholder="请选择笔记所属的知识库">
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
              创建笔记
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

export default CreateNote;
