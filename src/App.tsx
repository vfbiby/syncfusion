import './App.css';
import { Grid } from './components/grid/Grid';
import { Route, Routes } from 'react-router-dom';
import { Pivot } from './components/pivot/Pivot';
import { SendExtraParams } from './components/grid/SendExtraParams';
import { registerLicense } from '@syncfusion/ej2-base';
import { HandlingError } from './components/grid/HandlingError';
import { BindingWithAjax } from './components/grid/BindingWithAjax';

registerLicense(
  'ORg4AjUWIQA/Gnt2VVhjQlFaclhJXGJWf1ppR2Naf052flBAal5WVAciSV9jS3xSdkdjWXlbeHBdQGZYVQ==',
);

function App() {
  return <Routes>
    <Route path={'/'} element={<span>Hello World!</span>} />
    <Route path={'/grid'} element={<Grid />} />
    <Route path={'/grid/extra-params'} element={<SendExtraParams />} />
    <Route path={'/grid/handling-error'} element={<HandlingError />} />
    <Route path={'/grid/binding-with-ajax'} element={<BindingWithAjax />} />
    <Route path={'/pivot'} element={<Pivot />} />
  </Routes>;
}

export default App;
