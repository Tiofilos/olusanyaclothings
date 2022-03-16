import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  row: yup.string().required(),
  number: yup.string().required(),
  special: yup.string().required(),
});

export default yupResolver(schema);
