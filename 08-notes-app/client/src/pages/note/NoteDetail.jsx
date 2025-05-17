import React, { useState, useEffect } from "react";
import {
  Card,
  Tag,
  Layout,
  Menu,
  List,
  Divider,
  Typography,
  message,
  Affix,
  Button,
} from "antd";
import { getNote, getNotesByCategory } from "@/api/noteApi";
import { getCategory } from "@/api/categoryApi";
import { useStore } from "@/store/userStore";
import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import {
  FileTextOutlined,
  ArrowLeftOutlined,
  BookFilled,
  LockOutlined,
  DownOutlined,
  KeyOutlined,
  SettingOutlined,
  EllipsisOutlined,
  BarChartOutlined,
  BarsOutlined,
  SearchOutlined,
  PlusSquareOutlined,
  FileTextTwoTone,
  ProfileTwoTone,
  ReconciliationTwoTone,
  ProjectTwoTone,
  GoldTwoTone,
  SelectOutlined,
  OpenAIFilled,
  HomeOutlined,
  PicCenterOutlined,
} from "@ant-design/icons";
import "./NoteDetail.css";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import FooterComponent from "@/pages/note/components/FooterComponent";
import { Tooltip, Dropdown, Input } from "antd";
const { Content } = Layout;
const { Title, Text } = Typography;

const NoteDetail = () => {
  const { user } = useStore();
  const navigate = useNavigate();
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [categoryNotes, setCategoryNotes] = useState([]);
  const [outlineItems, setOutlineItems] = useState([]);
  const [leftWidth, setLeftWidth] = useState(250);
  const [rightWidth, setRightWidth] = useState(200);
  const [categoryName, setCategoryName] = useState("");
  const menu3 = [
    {
      icon: (
        <FileTextTwoTone twoToneColor="#3e90e3" style={{ fontSize: "16px" }} />
      ),
      label: "文档",
      key: "0",
      // onClick: () => handleCreateClick("0"),
    },
    {
      icon: (
        <ProfileTwoTone twoToneColor="#63ca8c" style={{ fontSize: "16px" }} />
      ),
      label: "表格",
      key: "1",
    },
    {
      icon: (
        <ReconciliationTwoTone
          twoToneColor="#9177d9"
          style={{ fontSize: "16px" }}
        />
      ),
      label: "画板",
      key: "2",
    },
    {
      icon: (
        <ProjectTwoTone twoToneColor="#29bddb" style={{ fontSize: "16px" }} />
      ),
      label: "数据表",
      key: "3",
    },
    {
      type: "divider",
    },
    {
      icon: <BookFilled style={{ color: "#679ff4", fontSize: "16px" }} />,
      label: "知识库",
      key: "4",
      // onClick: () => handleNewCategory(), // 新建知识库
    },
    {
      type: "divider",
    },
    {
      icon: <GoldTwoTone twoToneColor="#e4495b" style={{ fontSize: "16px" }} />,
      label: "从模版新建...",
      key: "5",
    },
    {
      icon: <OpenAIFilled style={{ fontSize: "16px", color: "#00b96b" }} />,
      label: "Ai帮你写",
      key: "6",
    },
    {
      icon: <SelectOutlined style={{ fontSize: "16px" }} />,
      label: "导入...",
      key: "7",
    },
  ];
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

        // 获取分类名称
        if (fetchedNote.data.category_id) {
          try {
            const categoryData = await getCategory(
              fetchedNote.data.category_id
            );
            setCategoryName(categoryData.data.name);
          } catch (error) {
            console.error("Failed to fetch category name:", error);
            message.error("获取分类名称失败");
          }
        }

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
      } catch (error) {
        console.error("获取同类别笔记失败", error);
        message.error("获取同类别笔记失败");
      }
    };
    fetchCategoryNotes();
  }, [note?.category_id, user?.id]);

  // 处理点击笔记列表项
  const handleNoteClick = (noteId) => {
    navigate(`/notes/${noteId}`);
  };

  // 返回首页
  const handleBack = () => {
    navigate("/");
  };

  if (!note) return <div>Loading...</div>;

  return (
    <Layout className="note-layout">
      {/* 左侧笔记列表 */}
      <Affix
        className="h-screen"
        style={{ position: "fixed", left: 0, top: 0 }}
      >
        <ResizableBox
          width={leftWidth}
          height={window.innerHeight}
          minConstraints={[180, window.innerHeight]}
          maxConstraints={[350, window.innerHeight]}
          axis="x"
          onResize={(e, data) => {
            setLeftWidth(data.size.width);
          }}
          className="note-sider bg-white shadow-md overflow-auto"
          handle={
            <div className="resize-handle-x absolute right-0 top-0 h-full w-2 cursor-ew-resize bg-gray-200 hover:bg-blue-300"></div>
          }
        >
          <div className="p-4 h-full">
            <Title level={4} className="mb-4">
              <Button
                type="primary"
                icon={<ArrowLeftOutlined />}
                onClick={handleBack}
                className="flex items-center w-[20px] h-[20px]"
              ></Button>
              <div className="flex items-center mt-2 justify-between">
                <div>
                  <BookFilled
                    style={{ fontSize: "22px" }}
                    className="text-blue-500 mr-1"
                  />
                  <span>{categoryName || "加载中..."}</span>
                  <span className="text-gray-500 ml-1 text-sm">
                    <LockOutlined />
                  </span>
                  <Tooltip title={"快速切换知识库"} arrow={false}>
                    <span className="cursor-pointer ml-4">
                      <DownOutlined
                        className="text-gray-400"
                        style={{ fontSize: "10px" }}
                      />
                    </span>
                  </Tooltip>
                </div>
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: "1",
                        icon: <KeyOutlined />,
                        label: "权限",
                      },
                      {
                        key: "2",
                        icon: <BarChartOutlined />,
                        label: "统计",
                      },
                      {
                        key: "3",
                        icon: <BarsOutlined />,
                        label: "目录管理",
                      },
                      {
                        key: "4",
                        icon: <SettingOutlined />,
                        label: "更多设置",
                      },
                    ],
                  }}
                  trigger={["click"]}
                  placement="bottomLeft"
                >
                  <div className="bg-transparent hover:bg-gray-100 px-2 py-1 rounded-md">
                    <EllipsisOutlined
                      className="text-black cursor-pointer transition-colors duration-200"
                      style={{ fontSize: "16px" }}
                    />
                  </div>
                </Dropdown>
              </div>
              <Divider className="m-0" />
              {/* 搜索框开始 */}
              <div className="mt-4 flex">
                <Input
                  prefix={<SearchOutlined className="text-gray-400" />}
                  className="bg-gray-100 border-none rounded transition-colors"
                  placeholder="搜索"
                />
                <Dropdown
                  menu={{ items: menu3 }}
                  trigger={["hover"]}
                  overlayStyle={{ padding: "10px 0", width: "160px" }}
                >
                  <span className="cursor-pointer">
                    <PlusSquareOutlined className="text-2xl hover:text-blue-600 ml-2" />
                  </span>
                </Dropdown>
              </div>
              {/* 搜索框结束 */}
              <div className="mt-2" style={{ fontSize: "13px" }}>
                <div className="mb-2">
                  <HomeOutlined className="mr-3" />
                  <span>首页</span>
                </div>
                <div className="flex justify-between">
                  <div>
                    <BarsOutlined className="mr-3" />
                    <span>目录</span>
                  </div>
                  <div>
                    <PicCenterOutlined />
                  </div>
                </div>
              </div>
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
                    <FileTextOutlined className="mr-2 ml-1" />
                    <Text ellipsis>{item.title}</Text>
                  </div>
                </List.Item>
              )}
            />
          </div>
        </ResizableBox>
      </Affix>

      {/* 中间内容区 */}
      <Content
        className="note-content p-4"
        style={{
          marginLeft: leftWidth + "px",
          marginRight: rightWidth + "px",
          paddingTop: "0",
          minHeight: "100vh",
        }}
      >
        <Card className="note-card shadow-lg" style={{ marginTop: "10px" }}>
          <Title level={2}>{note.title}</Title>
          <div className="my-4">
            {note.tags.map((tag) => (
              <Tag color="cyan" key={tag}>
                {tag}
              </Tag>
            ))}
          </div>
          <Divider />
          <div className="markdown-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeSlug]}
            >
              {note.content}
            </ReactMarkdown>
          </div>
        </Card>
        <FooterComponent />
      </Content>

      {/* 右侧大纲 */}
      <Affix
        className="h-screen"
        style={{ position: "fixed", right: 0, top: 0 }}
      >
        <ResizableBox
          width={rightWidth}
          height={window.innerHeight}
          minConstraints={[150, window.innerHeight]}
          maxConstraints={[300, window.innerHeight]}
          axis="x"
          onResize={(e, data) => {
            setRightWidth(data.size.width);
          }}
          className="outline-sider bg-white shadow-md overflow-auto"
          handle={
            <div className="resize-handle-x absolute left-0 top-0 h-full w-2 cursor-ew-resize bg-gray-200 hover:bg-blue-300"></div>
          }
        >
          <div className="outline-title p-4">
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
        </ResizableBox>
      </Affix>
    </Layout>
  );
};

export default NoteDetail;
