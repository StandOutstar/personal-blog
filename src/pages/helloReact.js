import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';

function Example() {
	const [count, setCount] = useState(0); // state hook
	
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

	return (
    <Layout>
			<p>You clicked {count} times</p>
			<button onClick={() => setCount(count + 1)}>
				Click
			</button>
    </Layout>
	);
}


const SimpleComponent = () => {
  return <div>SimpleComponent</div>
}

export default SimpleComponent;