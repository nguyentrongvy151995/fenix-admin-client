import React from 'react';
import { useParams } from 'react-router-dom';

function RankSettingDetail() {
  const params = useParams();
  console.log(params.id);
  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          Detail
        </h2>
      </div>

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <label className="mb-3 block text-black dark:text-white">
            Season
          </label>
          <input
            type="text"
            placeholder="Season"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>

        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <label className="mb-3 block text-black dark:text-white">
            Tier Name
          </label>
          <input
            type="text"
            placeholder="Season"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>

        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <label className="mb-3 block text-black dark:text-white">
            Medals
          </label>
          <input
            type="text"
            placeholder="Season"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>
      </div>
    </div>
  );
}

export default RankSettingDetail;
