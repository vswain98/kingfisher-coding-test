# kingfisher-coding-test

markdown
# EXERCISE 1 - Code Review

## MOCK CODE

```tsx
import React, { useState, useEffect } from 'react';

type Props = {.  
  userId: number;
};

const UserProfile: React.FC<Props> = ({ userId }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch(`https://api.example.com/user/${userId}`)
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.error("Error fetching user data:", error));
  }, []);
  
  return (
    <div>
      {user ? (
        <div>
          <h1>{user.name}</h1>
          <p>{user.bio}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserProfile;
Code Review For Mock Code
type Props = {. userId: number; }; => Syntax Error due to extra dot '.' typo error.

const [user, setUser] = useState<any>(null); => Using type 'any' here spoils the purpose of TypeScript, Should be strictly typed , it does not give enough information about what actually should data look like Suggestion: should define another interface defining detailed type of data. Suggesting Code snippet:

tsx
type User = {
  id: number;
  name: string;
  bio: string;
};
const [user, setUser] = useState<User | null>(null);
tsx
useEffect(() => {
  fetch(`https://api.example.com/user/${userId}`)
    .then(response => response.json())
    .then(data => setUser(data))
    .catch(error => console.error("Error fetching user data:", error));
}, []);
=> The dependency array of the useEffect is empty, so fetch only run once on componentDidMount. If the userId prop updates, the useEffect won't run again and the component might display old data

Suggested change:

tsx
useEffect(() => {
  fetch(`https://api.example.com/user/${userId}`)
    .then(response => response.json())
    .then(data => setUser(data))
    .catch(error => console.error("Error fetching user data:", error));
}, [userId]);
tsx
<div>
  {user ? (
    <div>
      <h1>{user.name}</h1>
      <p>{user.bio}</p>
    </div>
  ) : (
    <p>Loading...</p>
  )}
</div>
=> If the user object does not have name/bio, the chance of code-break is there it might go undefined. Suggested Change => {user?.name} and {user?.bio}

MOCK UNIT TEST
tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import UserProfile from "./UserProfile";

test("renders loading state initially", () => {
  render(<UserProfile userId={1} />);
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});
CODE REVIEW FOR MOCK UNIT TEST
The test doesn't look for fetching data, what happens after test completes and datas are displayed.

In order to get full coverage we can mock the fetch data and check for whether the component renders the fetched data.

Need to add this import "@testing-library/jest-dom";, else its throwing the below error "Property 'toBeInTheDocument' does not exist on type 'JestMatchers<HTMLElement>'.ts(2339)"