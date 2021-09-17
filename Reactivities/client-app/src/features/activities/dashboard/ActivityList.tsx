
import { Item, Button, Segment } from 'semantic-ui-react';
import React, {SyntheticEvent, useState} from 'react';
import { IActivity } from '../../../app/models/activity';

interface Props {
  activities: IActivity[];
  selectActivity: (id: string) => void;
  deleteActivity: (id: string) => void;
  submitting: boolean;
}

export default function ActivityList ({activities,selectActivity,  deleteActivity,  submitting}: Props) {
  const [target, setTarget] = useState('')
  function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string){
    setTarget(e.currentTarget.name);
    deleteActivity(id);
  }
  return (
    <Segment clearing>
      <Item.Group divided>
        {activities.map(activity => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as='a'>{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => selectActivity(activity.id)}
                  floated='right'
                  content='View'
                  color='blue'
                />
                <Button 
                  name={activity.id}
                  loading={target === activity.id && submitting}
                  onClick={(e) => handleActivityDelete(e, activity.id)}
                  floated='right'
                  content='Delete'
                  color='red'
                />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

