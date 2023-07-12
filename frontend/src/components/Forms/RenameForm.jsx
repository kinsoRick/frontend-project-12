import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import * as Yup from 'yup';

import { actions as modalsActions } from '../../store/modalsSlice';
import socket from '../../socket';

const RenameForm = ({ channelId }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const channelsNames = Object.values(useSelector((state) => state.channels.entities))
    .map((channel) => channel.name);

  const renameSchema = Yup.object().shape({
    serverRename: Yup.string().notOneOf(channelsNames, t('unique')),
  });

  const renameServer = async ({ serverRename }) => {
    socket.emit('renameChannel', { id: channelId, name: serverRename }, ({ status }) => {
      if (status === 'ok') toast.success(t('channelRenamed'));
    });
    dispatch(modalsActions.setCurrentModal('renameModal'));
  };

  return (
    <Formik
      initialValues={{
        serverRename: '',
      }}
      validationSchema={renameSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          await renameServer(values);
          resetForm();
        } catch (error) {
          throw new Error(`RENAMEFORM: ${error.message}`);
        }
      }}
    >
      <Form className="server-form">
        <div className="floating-field" style={{ width: '100%' }}>
          <Field className="server-name-input" id="serverRename" name="serverRename" placeholder={t('serverRename')} />
          <label htmlFor="serverRename">{t('serverRename')}</label>
          <ErrorMessage name="serverRename" component="div" className="input-error" />
        </div>

        <br />
        <button type="submit" className="btn-success">{t('rename')}</button>
        <button
          type="button"
          className="btn-cancel"
          onClick={() => dispatch(modalsActions.setCurrentModal('renameModal'))}
        >
          {t('cancel')}
        </button>
      </Form>
    </Formik>
  );
};

RenameForm.propTypes = {
  channelId: PropTypes.number.isRequired,
};

export default RenameForm;
