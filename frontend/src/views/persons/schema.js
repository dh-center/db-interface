import Schema from '../../lib/schema';
import { MultilingualString, ApiDate } from '../../lib/schema/types';

const fields = {
  firstName: MultilingualString,
  lastName: MultilingualString,
  patronymic: MultilingualString,
  description: MultilingualString,
  profession: MultilingualString,
  birthDate: ApiDate,
  deathDate: ApiDate
};

export default new Schema(fields);
