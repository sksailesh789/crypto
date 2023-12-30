import React,{useEffect,useState} from 'react';
import Dropzone from 'react-dropzone';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {useNavigate,useParams} from 'react-router-dom'
import IconButton from '@mui/material/IconButton';
import BackIcon from '@mui/icons-material/ArrowBack';
import injectSaga from '../../../utils/injectSaga';
import injectReducer from '../../../utils/injectReducer';
import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';
import reducer from '../reducer';
import saga from '../saga';
import {
  makeSelectOne,
  makeSelectLoading,
  makeSelectErrors,
} from '../selectors';
import * as mapDispatchToProps from '../actions';
import Loading from '../../../components/Loading';
import Input from '../../../components/customComponents/Input';
import {IMAGE_BASE} from '../../App/constants.js'


const AddCrypto = (props) => {
const {
  one,
  loading,
  errors,
  clearErrors,
  loadOneRequest,
  setOneValue,
  addEditRequest,
  clearOne
} = props;

// const [state, setState] = useState({
//   images: {
//     logo: [],
//   },
// });
const [droppedImages, setDroppedImages] = useState([]);
// const { images } = state;

const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    clearOne()
    clearErrors();
    if (id) {
      loadOneRequest(id);
    }

    return () => {
      clearOne()
    clearErrors();

    }
  }, []);

    const handleChange = (name,event) => {
      event.persist();
      setOneValue({ key: name, value: event.target.value });
    }

    const handleSave = () => {
      addEditRequest();
    };

    const handleGoBack = () => {
      navigate('/admin/admincrypto');
    };

    const onDrop = async (files, name) => {
  
      setOneValue({
        key: name,
        value: files,
      });
  
      const images = [];
  
      for (const file of files) {
        const dataUrl = await readFileAsDataURL(file);
        images.push(dataUrl);
      }
      setDroppedImages(images);
    };
    const readFileAsDataURL = (file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(file);
      });
    };


    useEffect(() => {
      if(id && one.image && one.image.length > 0){
        const images = [];
        for (const image of one.image) {
          images.push(`${IMAGE_BASE}${image.path}`);
        }
        setDroppedImages(images);
      }
    }, [id,one]);

    return loading && loading == true ? (
      <Loading />
    ) : (
    <>
    <div>
        <div className="flex justify-between mt-3 mb-3">
          <PageHeader>
            <IconButton
              onClick={handleGoBack}
              aria-label="Back"
            >
              <BackIcon />
            </IconButton>
            {id ? 'Edit Crypto' : 'Add Crypto'}
          </PageHeader>
        </div>
        <PageContent>
          <div className="w-full md:w-1/2 pb-4">
            <Input
              label="name"
              inputclassName="inputbox"
              inputid="grid-crypto-name"
              type="text"
              value={one.name}
              onChange={(e) => handleChange('name',e)}
              error={errors.name}
            />
          </div>

          <div className="w-full md:w-1/2 pb-4">
            <Dropzone onDrop={files => onDrop(files, 'image')} multiple={true}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} style={{ width: '100%' }}>
                  <input {...getInputProps()} />
                  <section
                    style={{ width: '100%' }}
                    className="text-black hover:text-primary text-center self-start py-3 px-4 border border-gray-500 rounded-lg border-dashed cursor-pointer"
                  >
                    <button
                      type="button"
                      className="text-black py-2 px-4 rounded font-bold bg-waftprimary hover:text-primary"
                    >
                      Upload image
                    </button>
                  </section>
                </div>
              )}
            </Dropzone>
          </div>

          {/* <div className="w-full md:w-1/2">
            {images.logo && <img src={images.logo} alt="Brand Logo" />}
          </div> */}
          <div className="w-full md:w-1/2 flex ">
        {droppedImages.map((image, index) => (
          <img key={index} src={image} alt={`Dropped Image ${index + 1}`} className='h-30 me-8'/>
        ))}
      </div>
          
          <button
            type="button"
            className="text-white py-2 px-4 rounded mt-4 btn-waft z-10"
            onClick={handleSave}
            // disabled={!images.logo}
          >
            Save
          </button>
        </PageContent>
      </div>
    </>
  )
}

const withReducer = injectReducer({ key: 'crypto', reducer });
const withSaga = injectSaga({ key: 'crypto', saga });

const mapStateToProps = createStructuredSelector({
  one: makeSelectOne(),
  loading: makeSelectLoading(),
  errors: makeSelectErrors(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps },
);

export default compose(
  //   withRouter,
  //   withStyle,
    withReducer,
    withSaga,
    withConnect,
  )(AddCrypto)