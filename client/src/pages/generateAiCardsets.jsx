


<div>
<h1>Create a Card Set</h1>
<form onSubmit={handleAIFormSubmit}>
    <div>
        <label htmlFor="amount">Amount:</label>
        <input type="number" name="amount" id="amount" onChange={handleChange} />
    </div>
    <div>
        <label htmlFor="topic">Topic:</label>
        <input type="text" name="topic" id="topic" onChange={handleChange} />
    </div>
    <button type="submit">Create Card Set</button>
</form>
</div>