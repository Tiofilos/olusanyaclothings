import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string(),
  pictureUrl: yup.string(),
  datetime: yup.string().required(),
});

export default yupResolver(schema);
