import { useForm, useFieldArray } from 'react-hook-form';
import rankSettingApi from 'src/apis/rankSetting.api';
import { inputCustom } from 'src/utils/common.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { MESSAGE } from 'src/constants/message';

function DetailRankSetting() {
  const params = useParams();
  const [rankSetting, setRankSetting] = useState<any>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<any>({
    values: {
      season: rankSetting?.season,
      tierName: rankSetting?.tierName,
      medals: rankSetting?.medals,
      RequiredCoins: rankSetting?.RequiredCoins,
    },
  });
  const getRankSetting = async () => {
    const data: any = await rankSettingApi.getRankSetting(params.id as string);
    setRankSetting(data.data);
  };

  useEffect(() => {
    getRankSetting();
  }, []);

  let { fields, remove, append } = useFieldArray({
    control,
    name: 'RequiredCoins',
    rules: {required: true}
  });

  const onSubmit = async (data: any) => {
    const result = await rankSettingApi.putRankSettings(params.id || '', data);
    if (result?.data) {
      toast.success(MESSAGE.UPDATED_SUCCESS);
    }
  };

  if (!rankSetting) return;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          Edit Rank Setting
        </h2>
      </div>

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <label className="mb-3 block text-black dark:text-white">
            Season
          </label>
          <input
            {...register('season', { required: true })}
            type="text"
            placeholder="Season"
            className={inputCustom}
          />
          {errors.season?.type === 'required' && (
            <p className="text-red-600 mt-2">This field is required</p>
          )}
        </div>

        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <label className="mb-3 block text-black dark:text-white">
            Tier Name
          </label>
          <input
            {...register('tierName', { required: true })}
            type="text"
            placeholder="Tier Name"
            className={inputCustom}
          />
          {errors.tierName?.type === 'required' && (
            <p className="text-red-600 mt-2">This field is required</p>
          )}
        </div>

        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <label className="mb-3 block text-black dark:text-white">
            Medals
          </label>
          <input
            {...register('medals', { required: true })}
            type="number"
            placeholder="Season"
            className={inputCustom}
          />
          {errors.medals && (
            <p className="text-red-600 mt-2">This field is required</p>
          )}
        </div>

        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <label className="mb-3 block text-black dark:text-white">
            RequiredCoins
          </label>
          {/* dynamic */}
          {fields.map(({ id, coin, quantity }: any, index: number) => (
            <div className="flex gap-3 mb-2 items-start" key={id}>
              <div className="">
                <input
                  {...register(`RequiredCoins[${index}].coin`, {
                    required: true,
                  })}
                  placeholder="coin"
                  className={inputCustom}
                  defaultValue={coin}
                  type="text"
                />
                {Array.isArray(errors.RequiredCoins) &&
                  errors.RequiredCoins[index]?.coin && (
                    <p className="text-red-600 mt-2">This field is required</p>
                  )}
              </div>
              <div className="">
                <input
                  {...register(`RequiredCoins[${index}].quantity`, {
                    required: true,
                  })}
                  placeholder="quantity"
                  className={inputCustom}
                  type="number"
                />
                {Array.isArray(errors.RequiredCoins) &&
                  errors.RequiredCoins[index]?.quantity && (
                    <p className="text-red-600 mt-2">This field is required</p>
                  )}
              </div>
              <button
                className="mt-3"
                type="button"
                onClick={() => remove(index)}
              >
                Remove
              </button>
            </div>
          ))}
          {/* dynamic form field  */}
          <a
            type="submit"
            className="mt-2 cursor-pointer inline-flex items-center justify-center bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            onClick={() => append({ coin: '', quantity: 0 })}
          >
            Add
          </a>
        </div>
      </div>
      <input
        type="submit"
        className="mt-2 cursor-pointer inline-flex items-center justify-center bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
      />
    </form>
  );
}

export default DetailRankSetting;
