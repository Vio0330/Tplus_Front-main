import React, { useState, useEffect } from 'react';

function MyComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 요청에 사용할 JSON 데이터
    const requestData = {
      
      key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ2aW8iLCJleHAiOjE3MjQwMjk5NDl9.BMoiq8YJkg1_c9oH0eiKTWka3wetVM2oT5lbGqEdb0E",
      cat: "목적_18",
      text: "Our language helps to reveal our deeper assumptions. Think of these revealing phrases: When we accomplish something important, we say it took 'blood, sweat, and tears.' We say important achievements are 'hard-earned.' We recommend a 'hard day’s work' when 'day’s work' would be enough. When we talk of 'easy money,' we are implying it was obtained through illegal or questionable means. We use the phrase 'That’s easy for you to say' as a criticism, usually when we are seeking to invalidate someone’s opinion. It’s like we all automatically accept that the 'right' way is, inevitably, the harder one. In my experience this is hardly ever questioned. What would happen if you do challenge this sacred cow? We don’t even pause to consider that something important and valuable could be made easy. What if the biggest thing keeping us from doing what matters is the false assumption that it has to take huge effort?",
      opts: "① resist the tendency to avoid any hardship<n>② escape from the pressure of using formal language<n>③ doubt the solid belief that only hard work is worthy<n>④ abandon the old notion that money always comes first<n>⑤ break the superstition that holy animals bring good luck",
      ans: "Answer: ③",
      theme: "c4"
    };

    // API 호출
    fetch('https://www.jangyeongsil.withkang.org/w1', {
      method: 'POST', // POST 요청
      headers: {
        'Content-Type': 'application/json' // JSON 형식의 본문을 보냄
      },
      body: JSON.stringify(requestData) // 요청 본문에 JSON 데이터 포함
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // JSON 형태로 변환
      })
      .then((data) => {
        setData(data); // 데이터 상태 업데이트
        setLoading(false); // 로딩 상태 종료
      })
      .catch((error) => {
        setError(error); // 에러 상태 업데이트
        setLoading(false);
      });
  }, []); // 빈 배열이므로 컴포넌트가 처음 렌더링될 때만 실행됨

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {/* 데이터를 화면에 표시 */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default MyComponent;
