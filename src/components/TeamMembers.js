import React from 'react';

export default function TeamMembers(props){
    const {team} = props;
    return (
        <>
        {(team.length > 0) && (
        <div data-cy='teamMembers' className="team-members">
           <h2> Registered Team Members</h2>
           <div className='team-div'>
            {
                team.map(member => (
                    <div key={member.id} className='team-member'>
                        <p>Name: {member.name}</p>
                        <p>Role: {member.role}</p>
                        <p>Email: {member.email}</p>
                        <p>Requested Product Teams</p>
                        <ol>
                            {member.product1 && (<li>{member.product1}</li>)}
                            {member.product2 && (<li>{member.product2}</li>)}
                            {member.product3 && (<li>{member.product3}</li>)}
                        </ol>
                   </div>
                ))
            }
            </div>
        </div>
        )
        }
        </>)
    
}