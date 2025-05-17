import React, { useState, useEffect } from "react";
import { List, Card, Tag, Button, Space, Empty } from "antd";
import { getNotesByCategory } from "@/api/noteApi";
import { useStore } from "@/store/userStore";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";

const CategoryNotes = () => {
  const { user } = useStore();
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [navigate, user]);

  const handleBack = () => {
    navigate("/categoryHome");
  };

  const handleCreateNote = () => {
    navigate(`/create-note`);
  };

  useEffect(() => {
    const fetchNotesByCategory = async () => {
      try {
        const fetchedNotes = await getNotesByCategory(user.id, categoryId);
        setNotes(fetchedNotes.data);
      } catch (error) {
        console.error("Failed to fetch notes by category:", error);
        alert("获取笔记失败");
      }
    };
    fetchNotesByCategory();
  }, [categoryId, user?.id]);

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 ">知识库笔记列表</h1>
        <Space>
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={handleCreateNote}
          >
            新建笔记
          </Button>
          <Button icon={<ArrowLeftOutlined />} onClick={handleBack}>
            返回知识库首页
          </Button>
        </Space>
      </div>

      {notes.length > 0 ? (
        <List
          grid={{ gutter: 24, column: 4 }}
          dataSource={notes}
          renderItem={(item) => (
            <List.Item>
              <Card
                hoverable
                className="h-40 flex flex-col justify-between shadow-sm transition-all duration-300 hover:shadow-lg bg-white rounded-xl"
                onClick={() => navigate(`/notes/${item.id}`)}
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 line-clamp-1">
                    {item.content}
                  </p>
                </div>
                <div className="mt-4">
                  {item.tags?.length > 0 &&
                    item.tags.map((tag) => (
                      <Tag color="cyan" key={tag} className="mr-1 mb-1">
                        {tag}
                      </Tag>
                    ))}
                </div>
              </Card>
            </List.Item>
          )}
        />
      ) : (
        <Empty description="暂无笔记" />
      )}
    </div>
  );
};

export default CategoryNotes;
