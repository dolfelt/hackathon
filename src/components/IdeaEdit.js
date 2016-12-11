import React, {PropTypes} from 'react';
import {
  Row,
  Col,
  Form, Input, FormGroup, Label,
  Button
} from 'reactstrap';

const IdeaEdit = ({
  idea,
  saving,
  onChange,
  onSubmit,
  onCancel,
  onDelete,
}) => {
  return (
    <Row>
      <Col xs={12}>
        <h2>Edit Your Idea</h2>
        <Form onSubmit={onSubmit}>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label>Title</Label>
                <Input name="title"
                  value={idea.title}
                  onChange={onChange('title')}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>Project URL</Label>
                <Input name="repo"
                  placeholder="https://project.example.com/"
                  value={idea.repo}
                  onChange={onChange('repo')}
                />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label>Description</Label>
            <Input
              type="textarea"
              name="description"
              rows="10"
              value={idea.description}
              onChange={onChange('description')}
            />
          </FormGroup>
          <Button
            className="float-xs-right"
            outline
            color="danger"
            onClick={(e) => { e.preventDefault(); onDelete(); }}
          >Delete</Button>
          <Button
            color="primary"
            disabled={saving}
          >Save</Button>
          <Button color="link" onClick={(e) => { e.preventDefault(); onCancel(); }}>Cancel</Button>
        </Form>
      </Col>
    </Row>
  )
};

IdeaEdit.propTypes = {
  idea: PropTypes.object.isRequired,
  saving: PropTypes.bool,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  onDelete: PropTypes.func,
}

export default IdeaEdit;
