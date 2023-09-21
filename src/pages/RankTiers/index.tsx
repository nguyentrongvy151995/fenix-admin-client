import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import rankSettingApi from "src/apis/rankTier.api";
import IconDelete from "src/components/IconDelete";
import { MESSAGE } from "src/constants/message";
import ButtonWithIcon from "../UiElements/ButtonWithIcon";

function RankSetting() {
  const [currentPage, setCurrentPage] = useState(1)
  const [isDelete, setIsDelete] = useState<Boolean>(false)

  const [rankSettings, setRankSettings] = useState()
  console.log('currentPage', currentPage);
  const getRankSettings = async () => {
    const data : any = await rankSettingApi.getRankSettings(currentPage)
    setRankSettings(data)
  }
  console.log(rankSettings)
  useEffect(() => {
    getRankSettings();
  }, [currentPage, isDelete]);

  if(!rankSettings) return;
  return (
    <div>
      Rank Setting
      <ButtonWithIcon name="add new" className="mb-5 mt-5" path={`add`} />
      <TableRankSetting
        list={rankSettings}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setIsDelete={setIsDelete}
        isDelete={isDelete}
      />
    </div>
  );
}

export default RankSetting;

const TableRankSetting = (props: any) => {
  const PAGE_SIZE = 10;
  const handlePage = (page: number) => {
    props.setCurrentPage(page)
  }
  const handleDelete = async (id : string) => {
    const conf = confirm(MESSAGE.ARE_SURE_DELETE);
    if(!conf) return;
    const result = await rankSettingApi.deleteRankSetting(id)
    if(result) toast.success(MESSAGE.DELETED_SUCCESS)
    props.setIsDelete(!props.isDelete);
  }
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Season
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                TierName
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Medal
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Created At
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {props.list?.data.map((item: any, index: number) => {
              return (
                <tr key={item._id}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <p className="text-black dark:text-white">{item.season}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {item.tierName}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                      {item.medals}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                      {item.createdAt}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <Link to={`${item._id}`} className="hover:text-primary">
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                            fill=""
                          />
                          <path
                            d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                            fill=""
                          />
                        </svg>
                      </Link>
                      <button className="hover:text-primary" onClick={() => handleDelete(item._id)}>
                        <IconDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <nav
          aria-label="Page navigation example"
          className="flex justify-center mt-4"
        >
          <ul className="inline-flex -space-x-px text-sm mx-auto">
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </a>
            </li>
            {Array(Math.ceil(props.list.total / PAGE_SIZE))
              .fill(0)
              .map((_: any, index) => {
                return (
                  <li key={index}>
                    <a
                      onClick={() => handlePage(index + 1)}
                      href="#"
                      className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      {index + 1}
                    </a>
                  </li>
                );
              })}
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
