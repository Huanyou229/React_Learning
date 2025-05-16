import React, { useState, useEffect, useRef } from "react";
import { Form, Input, Button, Tag, message, Select } from "antd";
import "@toast-ui/editor/dist/toastui-editor.css"; // Toast UI 样式
import { Editor } from "@toast-ui/react-editor"; // 引入 Toast UI 编辑器
import { updateNote, getNote } from "@/api/noteApi";
import { getCategories } from "@/api/categoryApi";
import { useStore } from "@/store/userStore";
import { useNavigate, useParams } from "react-router-dom";
import { uploadFile } from "@/api/uploadApi";

const EditNote = () => {
  const navigate = useNavigate();
  const { noteId } = useParams();
  const { user } = useStore();
  const [tags, setTags] = useState([]);
  const [inputTag, setInputTag] = useState("");
  const [categories, setCategories] = useState([]);
  const [form] = Form.useForm();
  const editorRef = useRef(); // 用于获取编辑器内容
  const [noteData, setNoteData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [noteResponse, categoriesResponse] = await Promise.all([
          getNote(noteId),
          getCategories(),
        ]);
        const fetchedNoteData = noteResponse.data;
        setNoteData(fetchedNoteData);
        setTags(fetchedNoteData.tags);
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        message.error("获取数据失败");
      }
    };
    fetchData();
  }, [noteId]);

  useEffect(() => {
    if (noteData) {
      form.setFieldsValue({
        title: noteData.title,
        categoryId: noteData.categoryId,
      });
      if (editorRef.current) {
        editorRef.current.getInstance().setMarkdown(noteData.content || "");
      }
    }
  }, [noteData, form]);

  const handleSubmit = async (values) => {
    try {
      const content = editorRef.current
        ? editorRef.current.getInstance().getMarkdown()
        : "";
      const updatedNote = {
        ...values,
        tags,
        content,
        userId: user.id,
      };
      await updateNote(noteId, updatedNote);
      message.success("笔记更新成功");
      navigate("/");
    } catch (error) {
      console.error("Failed to update note:", error);
      message.error("更新笔记失败");
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
    <>
      <div className="p-4">
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          className="max-w-2xl mx-auto"
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
              height="300px"
              placeholder="请输入笔记内容（支持 Markdown）"
              usageStatistics={false}
              hideModeSwitch={true}
              hooks={{
                addImageBlobHook: async (blob, callback) => {
                  try {
                    const res = await uploadFile(blob); // 使用你的上传接口
                    callback(res.url, "图片");
                  } catch (err) {
                    message.error("图片上传失败：" + err.message);
                  }
                },
              }}
            />
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
              更新笔记
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default EditNote;
