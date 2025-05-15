import React, { useState, useEffect } from "react";
import { getDetailedNotes, deleteNote } from "@/api/noteApi";
import { useStore } from "@/store/userStore";
import { useNavigate } from "react-router-dom";
import {
  DeleteOutlined,
  EditOutlined,
  FileTextTwoTone,
} from "@ant-design/icons";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Divider, Modal, message } from "antd";
import FooterComponent from "@/pages/note/components/FooterComponent";

dayjs.extend(utc);

const NoteList = () => {
  const navigate = useNavigate();
  const { user } = useStore();
  const [notes, setNotes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  const fetchNotes = async () => {
    try {
      if (!user?.id) return; // 无用户则不请求
      const response = await getDetailedNotes(user.id);
      setNotes(response.data);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [user.id]);

  const handleEdit = (id) => {
    if (!user?.id) {
      message.warning("请先登录");
      navigate("/login");
      return;
    }
    navigate(`/notes/edit/${id}`);
  };

  const handleDelete = (id) => {
    if (!user?.id) {
      message.warning("请先登录");
      navigate("/login");
      return;
    }
    setModalVisible(true);
    setSelectedNoteId(id);
  };

  const confirmDelete = async () => {
    try {
      await deleteNote(selectedNoteId);
      message.success("笔记删除成功");
      fetchNotes();
    } catch (error) {
      console.error("Failed to delete note:", error);
      message.error("删除笔记失败");
    } finally {
      setModalVisible(false);
      setSelectedNoteId(null);
    }
  };

  return (
    <div className="w-full">
      {notes.map((item) => (
        <div key={item.id} className="hover:bg-gray-100">
          <div className="flex items-center justify-between border-b border-gray-200 py-4 px-2 ">
            {/* 图标 + 标题 */}
            <div className="flex items-center space-x-2 w-1/3 min-w-0">
              <FileTextTwoTone
                twoToneColor="#3e90e3"
                style={{ fontSize: "18px", flexShrink: 0 }}
              />
              <a
                href={`/notes/${item.id}`}
                className="truncate text-base text-black no-underline hover:text-blue-600"
              >
                {item.title}
              </a>
            </div>

            {/* 作者 / 分类 */}
            <div className="text-sm text-gray-600 w-1/3 text-left ">
              {item.username} / {item.categoryName}
            </div>

            {/* 更新时间 + 操作按钮 */}
            <div className="flex items-center justify-end space-x-10 w-1/3">
              <span className="text-sm text-gray-500">
                {dayjs
                  .utc(item.updated_at)
                  .local()
                  .format("YYYY-MM-DD HH:mm:ss")}
              </span>
              <EditOutlined
                className="text-gray-500 cursor-pointer hover:text-blue-500"
                onClick={() => handleEdit(item.id)}
              />
              <DeleteOutlined
                className="text-gray-500 cursor-pointer hover:text-red-500"
                onClick={() => handleDelete(item.id)}
              />
            </div>
          </div>
          <Divider className="!my-0" />
        </div>
      ))}

      <Modal
        title="确认删除"
        open={modalVisible}
        onOk={confirmDelete}
        okText="确定"
        cancelText="取消"
        centered={true}
        onCancel={() => {
          setModalVisible(false);
          setSelectedNoteId(null);
        }}
      >
        <p>确定要删除这条笔记吗？此操作不可恢复。</p>
      </Modal>
      <FooterComponent />
    </div>
  );
};

export default NoteList;
