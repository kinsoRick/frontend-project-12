import { Formik, Field, Form } from 'formik';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

function RenameForm({ renameServer, controlModal }) {
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{
        serverRename: '',
      }}
      onSubmit={(values, { resetForm }) => {
        renameServer(values);
        resetForm();
      }}
    >
      <Form className="server-form">
        <Field className="server-name-input" id="serverRename" name="serverRename" placeholder="Новое название сервера" />
        <br />
        <button type="submit" className="btn-success">{t('rename')}</button>
        <button
          type="button"
          className="btn-cancel"
          onClick={(e) => controlModal(e)}
          data-modal
        >
          {t('cancel')}
        </button>
      </Form>
    </Formik>
  );
}

RenameForm.propTypes = {
  renameServer: PropTypes.func.isRequired,
  controlModal: PropTypes.func.isRequired,
};

export default RenameForm;