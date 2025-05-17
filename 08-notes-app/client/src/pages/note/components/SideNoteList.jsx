import React from "react";
import {
  Typography,
  List,
  Divider,
  Button,
  Input,
  Tooltip,
  Dropdown,
  Affix,
} from "antd";
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
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import PropTypes from "prop-types";

const { Title, Text } = Typography;

const SideNoteList = ({
  leftWidth,
  setLeftWidth,
  categoryName,
  categoryNotes,
  handleBack,
  handleNoteClick,
  id,
}) => {
  const menu3 = [
    {
      icon: (
        <FileTextTwoTone twoToneColor="#3e90e3" style={{ fontSize: "16px" }} />
      ),
      label: "文档",
      key: "0",
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

  return (
    <Affix className="h-screen" style={{ position: "fixed", left: 0, top: 0 }}>
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
                  <span className="cursor-pointer  ml-4">
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
                className="bg-gray-100 border-none rounded transition-colors "
                placeholder="搜索"
              />
              <Dropdown
                menu={{ items: menu3 }}
                trigger={["hover"]}
                overlayStyle={{ padding: "10px 0", width: "160px" }}
              >
                <span className="cursor-pointer">
                  <PlusSquareOutlined className="text-2xl  hover:text-blue-600 ml-2" />
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
  );
};
SideNoteList.propTypes = {
  leftWidth: PropTypes.number.isRequired,
  setLeftWidth: PropTypes.func.isRequired,
  categoryName: PropTypes.string.isRequired,
  categoryNotes: PropTypes.array.isRequired,
  handleBack: PropTypes.func.isRequired,
  handleNoteClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};
export default SideNoteList;
