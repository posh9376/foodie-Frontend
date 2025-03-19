import styled from "styled-components";
import profilePic from "../Imgs/profile.png"; // Replace with your actual image path

function Account() {
    let username = localStorage.getItem('username')
    let email = localStorage.getItem('email')
  return (
    <AccountContainer>
      <ProfileImage src={profilePic} alt="User Profile" />
      <UserDetails>
        <DetailRow>
          <Label>Username:</Label>
          <Value>{username}</Value>
        </DetailRow>
        <DetailRow>
          <Label>Email:</Label>
          <Value>{email}</Value>
        </DetailRow>
      </UserDetails>
      <EditButton>Edit Details</EditButton>
    </AccountContainer>
  );
}

export default Account;

const AccountContainer = styled.div`
  background: linear-gradient(35deg, #494949, #313131);
  color: white;
  padding: 2rem;
  border-radius: 1rem;
  width: 350px;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 8px 16px rgba(0,0,0,0.3);
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 3px solid #f27121;
  object-fit: cover;
  margin-bottom: 1.5rem;
`;

const UserDetails = styled.div`
  width: 100%;
  margin-bottom: 1.5rem;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const Label = styled.span`
  font-weight: bold;
  color: #f27121;
`;

const Value = styled.span`
  color: #fff;
`;

const EditButton = styled.button`
  padding: 0.8rem 1.5rem;
  background: linear-gradient(to right, #f27121, #e94057);
  color: white;
  border: none;
  border-radius: 0.8rem;
  cursor: pointer;
  font-size: 1rem;
  transition: 0.3s ease;

  &:hover {
    background: linear-gradient(to right, #e94057, #f27121);
  }
`;
