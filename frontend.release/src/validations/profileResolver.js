import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required(),
  password: yup.string(),
  isLoyalty: yup.boolean().required(),
});

export default yupResolver(schema);
