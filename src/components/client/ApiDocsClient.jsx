"use client";

import { useState } from "react";

import ApiHeader from "@/components/sections/api-docs/ApiHeader";

import EndpointGrid from "@/components/sections/api-docs/EndpointGrid";

import RequestBuilder from "@/components/sections/api-docs/RequestBuilder";

import LiveResponse from "@/components/sections/api-docs/LiveResponse";

import CodePreview from "@/components/sections/api-docs/CodePreview";
import { endpoints } from "../dummyData";



export default function ApiDocsClient() {
	const [active, setActive] =
		useState(endpoints[0]);

	const [showResponse, setShowResponse] =
		useState(false);

	return (
		<div className="min-h-screen bg-background p-6 space-y-6">

			<ApiHeader />

			<EndpointGrid
				endpoints={endpoints}
				active={active}
				setActive={setActive}
			/>

			<div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

				<RequestBuilder
					active={active}
					onRun={() =>
						setShowResponse(true)
					}
				/>

				<LiveResponse
					showResponse={
						showResponse
					}
				/>

			</div>

			<CodePreview />

		</div>
	);
}