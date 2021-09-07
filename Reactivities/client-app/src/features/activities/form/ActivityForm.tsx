import React, { ChangeEvent } from "react";
import { useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";

interface Props {
    activity: IActivity | undefined;
    setEditMode: (editMode: boolean) => void;
    createActivity: (activity: IActivity) => void;
    editActivity: (activity: IActivity) => void;
    createOrEdit: (activity: IActivity) => void

}

export default function ActivityForm({activity: selectedActivity, setEditMode, createActivity, editActivity, createOrEdit}: Props){

    const initialsState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    }
    const [activity, setActivity] = useState(initialsState);

    function handleSubmit() {
        createOrEdit(activity);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name, value} = event.target;
        setActivity({...activity, [name]: value})
    }
    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange}/>
                <Form.TextArea placeholder='Decsription' value={activity.description} name='description' onChange={handleInputChange}/>
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange}/>
                <Form.Input placeholder='Date' value={activity.date} name='date' onChange={handleInputChange}/>
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange}/>
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange}/>
                <Button floated='right' positive type='submit' content='Submit'/>
                <Button onClick={() => setEditMode(false)} floated='right' type='button' content='Cancel'/>
            </Form>
        </Segment>
    )
}