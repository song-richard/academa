


const [updateCardSet, {error: updateError}] = useMutation(UPDATE_CARDSET);


// form submission for updating a card set
const handleUpdateSubmit = async (event) => {
  event.preventDefault();
  try {
      const {data} = await updateCardSet({
          variables: {...formState, userId: _id}
      });
      console.log(data);
      history.push('/dashboard');
  } catch (e) {
      console.error(e);
  }
};

const handleChange = (event) => {
  const {name, value} = event.target;
  setFormState({
      ...formState,
      [name]: value
  });
};
