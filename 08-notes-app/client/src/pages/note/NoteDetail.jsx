import React, { useState, useEffect } from "react";
import {
  Card,
  Tag,
  Layout,
  Menu,
  Typography,
  List,
  Divider,
  message,
} from "antd";
import { getNote, getNotesByCategory } from "@/api/noteApi";
import { useStore } from "@/store/userStore";
import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import {
  FileTextOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import "./NoteDetail.css";

const { Content, Sider } = Layout;
const { Title, Text } = Typography;

const NoteDetail = () => {
  const { user } = useStore();
  const navigate = useNavigate();
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [categoryNotes, setCategoryNotes] = useState([]);
  const [outlineItems, setOutlineItems] = useState([]);
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [rightCollapsed, setRightCollapsed] = useState(false);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [navigate, user]);

  // 获取笔记详情
  useEffect(() => {
    const fetchNoteDetails = async () => {
      try {
        const fetchedNote = await getNote(id);
        setNote(fetchedNote.data);
        console.log("笔记详情:", fetchedNote.data);

        // 解析Markdown内容提取标题
        const extractHeadings = (content) => {
          const headingRegex = /^(#{1,6})\s+(.+)$/gm;
          const headings = [];
          let match;

          while ((match = headingRegex.exec(content)) !== null) {
            const level = match[1].length;
            const text = match[2].trim();
            const id = text
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^\w-]/g, "");

            headings.push({
              level,
              text,
              id,
              key: `heading-${headings.length}`,
            });
          }

          return headings;
        };

        if (fetchedNote.data.content) {
          const headings = extractHeadings(fetchedNote.data.content);
          setOutlineItems(headings);
        }
      } catch (error) {
        console.error("Failed to fetch note details:", error);
        message.error("获取笔记详情失败");
        navigate("/notes");
      }
    };

    if (user && id) {
      fetchNoteDetails();
    }
  }, [id, navigate, user]);

  // 获取同类别笔记
  useEffect(() => {
    const fetchCategoryNotes = async () => {
      if (!note?.category_id || !user?.id) return;
      try {
        const categoryNotesData = await getNotesByCategory(
          user.id,
          note.category_id
        );
        setCategoryNotes(categoryNotesData.data);
        console.log("同类别笔记:", categoryNotesData.data);
      } catch (error) {
        console.error("Failed to fetch category notes:", error);
        message.error("获取同类别笔记失败");
      }
    };

    fetchCategoryNotes();
  }, [note?.category_id, user?.id]);

  // 处理点击笔记列表项
  const handleNoteClick = (noteId) => {
    navigate(`/notes/${noteId}`);
  };

  if (!note) return <div>Loading...</div>;

  return (
    <Layout className="note-layout">
      {/* 左侧笔记列表 */}
      <Sider
        width={250}
        collapsible
        collapsed={leftCollapsed}
        onCollapse={setLeftCollapsed}
        collapsedWidth={0}
        zeroWidthTriggerStyle={{ top: 10 }}
        trigger={leftCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        className="note-sider"
      >
        <div className="p-4">
          <Title level={4} className="mb-4">
            同类别笔记
          </Title>
          <List
            dataSource={categoryNotes}
            renderItem={(item) => (
              <List.Item
                key={item.id}
                onClick={() => handleNoteClick(item.id)}
                className={`note-list-item ${parseInt(id) === item.id ? "note-list-item-active" : ""}`}
              >
                <div className="flex items-center">
                  <FileTextOutlined className="mr-2" />
                  <Text ellipsis>{item.title}</Text>
                </div>
              </List.Item>
            )}
          />
        </div>
      </Sider>

      {/* 中间内容区 */}
      <Content className="note-content">
        <Card className="note-card">
          <Title level={2}>{note.title}</Title>
          <Divider />
          <div className="markdown-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeSlug]}
            >
              {note.content}
            </ReactMarkdown>
          </div>
          <div className="my-4">
            {note.tags.map((tag) => (
              <Tag color="cyan" key={tag}>
                {tag}
              </Tag>
            ))}
          </div>
        </Card>
      </Content>

      {/* 右侧大纲 */}
      <Sider
        width={200}
        className="outline-sider"
        collapsible
        collapsed={rightCollapsed}
        onCollapse={setRightCollapsed}
        collapsedWidth={0}
        reverseArrow
        trigger={rightCollapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
      >
        <div className="outline-title">
          <Title level={4}>文档大纲</Title>
        </div>
        {outlineItems.length > 0 ? (
          <Menu mode="inline" className="outline-menu">
            {outlineItems.map((item) => (
              <Menu.Item
                key={item.key}
                style={{ paddingLeft: `${(item.level - 1) * 16 + 24}px` }}
                className="outline-menu-item"
                onClick={() => {
                  const element = document.getElementById(item.id);
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                {item.text}
              </Menu.Item>
            ))}
          </Menu>
        ) : (
          <div className="p-4">
            <Text type="secondary">没有找到标题</Text>
          </div>
        )}
      </Sider>
    </Layout>
  );
};

export default NoteDetail;
