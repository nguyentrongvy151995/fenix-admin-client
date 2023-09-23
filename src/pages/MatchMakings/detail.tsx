import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import matchMakingApi from 'src/apis/matchMaking.api';
import Input from 'src/components/Input';
import { MESSAGE } from 'src/constants/message';
import { inputCustom } from 'src/utils/common.css';
import { getRules } from 'src/utils/rules';

function DeailMatchMaking() {
  const params = useParams();
  const navigate = useNavigate();
  const [matchMaking, setMatchMaking] = useState<any>();
  const onSubmit = async (data: any) => {
    console.log('data', data);
    const result = await matchMakingApi.putMatchMakings(params?.id as string, data);
    if (result) {
      toast.success(MESSAGE.CREATED_SUCCESS);
      navigate('/match-makings');
    }
  };

  const getMatchMaking = async () => {
    const result: any = await matchMakingApi.getMatchMaking(
      params.id as string,
    );
    setMatchMaking(result.data);
  };

  useEffect(() => {
    getMatchMaking();
  }, []);

  

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    values: {
      tierWeight: matchMaking?.tierWeight,
      medalWeight: matchMaking?.medalWeight,
      winLossWeight: matchMaking?.winLossWeight,
      timeToUpRange: matchMaking?.timeToUpRange,
      pointRange: matchMaking?.pointRange,
    },
  });

  console.log('matchMaking', matchMaking);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">Edit</h3>
        </div>
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <label className="mb-3 block text-black dark:text-white font-semibold">
            Tier Weight:
          </label>
          <Input
            className={inputCustom}
            register={register}
            name="tierWeight"
            rules={getRules().tierWeight}
            errorMessage={errors.tierWeight?.message}
          />
        </div>

        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <label className="mb-3 block text-black dark:text-white font-semibold">
            Medal Weight:
          </label>
          <Input
            className={inputCustom}
            register={register}
            name="medalWeight"
            rules={getRules().tierWeight}
            errorMessage={errors.medalWeight?.message}
          />
        </div>

        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <label className="mb-3 block text-black dark:text-white font-semibold">
            WinLoss Weight:
          </label>
          <Input
            className={inputCustom}
            register={register}
            name="winLossWeight"
            rules={getRules().tierWeight}
            errorMessage={errors.winLossWeight?.message}
            type="number"
          />
        </div>
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <label className="mb-3 block text-black dark:text-white font-semibold">
            Point Range:
          </label>
          <Input
            className={inputCustom}
            register={register}
            name="pointRange"
            rules={getRules().tierWeight}
            errorMessage={errors.pointRange?.message}
            type="number"
          />
        </div>
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <label className="mb-3 block text-black dark:text-white font-semibold">
            Time To Up Range:
          </label>
          <Input
            className={inputCustom}
            register={register}
            name="timeToUpRange"
            rules={getRules().timeToUpRange}
            errorMessage={errors.timeToUpRange?.message}
            type="number"
          />
        </div>
      </div>
      <input
        type="submit"
        className="mt-2 cursor-pointer inline-flex items-center justify-center bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
      />
    </form>
  );
}

export default DeailMatchMaking;
