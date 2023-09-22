import { useForm, useFieldArray } from 'react-hook-form';
import { toast } from 'react-toastify';
import rankSettingApi from 'src/apis/rankTier.api';
import Input from 'src/components/Input';
import { MESSAGE } from 'src/constants/message';
import { inputCustom } from 'src/utils/common.css';
import { getRules } from 'src/utils/rules';

function AddRankTier() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const { fields, remove, append } = useFieldArray({
    control,
    name: 'coins',
    rules: getRules().RequiredCoins,
  });
  const onSubmit = async (data: any) => {
    const result = await rankSettingApi.postRankSettings(data);
    if(result) {
      toast.success(MESSAGE.CREATED_SUCCESS);
    }
  };

  console.log('fields', errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          Add New Rank Tier
        </h2>
      </div>

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <label className="mb-3 block text-black dark:text-white">
            Season
          </label>
          <Input
            className={inputCustom}
            register={register}
            name="season"
            rules={getRules().season}
            errorMessage={errors.season?.message}
          />
        </div>

        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <label className="mb-3 block text-black dark:text-white">
            Tier Name
          </label>
          <Input
            className={inputCustom}
            register={register}
            name="tierName"
            rules={getRules().season}
            errorMessage={errors.tierName?.message}
          />
        </div>

        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <label className="mb-3 block text-black dark:text-white">
            numberOfMedal
          </label>
          <Input
            className={inputCustom}
            register={register}
            name="numberOfMedal"
            rules={getRules().numberOfMedal}
            errorMessage={errors.numberOfMedal?.message}
            type="number"
          />
        </div>

        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <label className="mb-3 block text-black dark:text-white">Coins</label>
          <p className="text-red-600 mt-2">
            {errors.coins?.root?.message as string}
          </p>
          {/* dynamic */}
          {fields.map(({ id, coin, quantity }: any, index) => (
            <div className="flex gap-3 mb-2 items-start" key={id}>
              <div className="">
                <input
                  {...register(
                    `coins[${index}].coin`,
                    getRules().RequiredCoinsItem,
                  )}
                  placeholder="coin"
                  className={inputCustom}
                  defaultValue={coin}
                  type="text"
                />
                {Array.isArray(errors.coins) && errors.coins[index]?.coin && (
                  <p className="text-red-600 mt-2">
                    {errors.coins[index]?.coin.message}
                  </p>
                )}
              </div>
              <div className="">
                <input
                  {...register(
                    `coins[${index}].quantity`,
                    getRules().RequiredCoinsItem,
                  )}
                  placeholder="quantity"
                  defaultValue={quantity}
                  className={inputCustom}
                  type="number"
                />
                {Array.isArray(errors.coins) &&
                  errors.coins[index]?.quantity && (
                    <p className="text-red-600 mt-2">
                      {errors.coins[index]?.quantity.message}
                    </p>
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
            onClick={() => append({})}
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

export default AddRankTier;
