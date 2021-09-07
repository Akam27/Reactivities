import React, { useState, useEffect, Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import axios from 'axios';
import { IActivity } from '../models/activity';
import NavBar from '../layout/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  }

  const handleCreateActivity = (activity: IActivity) => {
    setActivities([...activities, activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  }

  const handleEditActivity = (activity: IActivity) => {
    setActivities([...activities.filter(a => a.id !== activity.id), activity])
    setSelectedActivity(activity);
    setEditMode(false);
  }

  const handleDeleteActivity = (id: string) => {
    setActivities([...activities.filter(a => a.id !== id)])
  }

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0]);
    setEditMode(false);
  };

  function handleCreateOrEditActivity(activity: IActivity){
    activity.id ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
    :setActivities([...activities, {...activity, id: uuid()}]);
    setEditMode(false);
    setSelectedActivity(activity);
  }


  useEffect(() => {
    axios
      .get<IActivity[]>('http://localhost:5000/api/activities')
      .then(response => {
        let activities: IActivity[] = [];
        response.data.forEach(activity => {
          activity.date = activity.date.split('.')[0]
          activities.push(activity);
        })
        setActivities(activities);
      });
  }, []);

  return (
    <Fragment>
      <NavBar openForm={handleOpenCreateForm} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
          createOrEdit={handleCreateOrEditActivity}
        />
      </Container>
    </Fragment>
  );
};

export default App;