"use client";

import { useEffect, useMemo, useState } from "react";
import {
  defaultProjectRoles,
  projectStatuses,
  projectStudents,
  projectVisibilities,
  starterProjects,
  type FutureReadyProject,
  type ProjectAsset,
  type ProjectTaskStatus,
  type ProjectVisibility,
} from "@/content/projects";

const STORAGE_KEY = "future-ready:ambassador-projects";
const MAX_FILE_SIZE = 2 * 1024 * 1024;

function loadProjects(): FutureReadyProject[] {
  if (typeof window === "undefined") return starterProjects;

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved
      ? (JSON.parse(saved) as FutureReadyProject[])
      : starterProjects;
  } catch {
    return starterProjects;
  }
}

function blankProject(): FutureReadyProject {
  return {
    id: `project-${Date.now()}`,
    title: "New Project",
    description: "",
    cohortId: "ambassador-2026",
    visibility: "Project Team",
    members: [],
    tasks: [],
    brainstormingNotes: "",
    workflowNotes: "",
    presentationNotes: "",
    assets: [],
    facilitatorFeedback: "",
    createdAt: new Date().toISOString(),
  };
}

export default function ProjectStudioPage() {
  const [projects, setProjects] =
    useState<FutureReadyProject[]>(starterProjects);
  const [selectedId, setSelectedId] = useState(starterProjects[0].id);
  const [newTask, setNewTask] = useState("");
  const [newLink, setNewLink] = useState("");
  const [newLinkName, setNewLinkName] = useState("");
  const [saved, setSaved] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const loaded = loadProjects();
    setProjects(loaded);
    setSelectedId(loaded[0]?.id ?? "");
    setHydrated(true);
  }, []);

  const selected = useMemo(
    () => projects.find((project) => project.id === selectedId) ?? projects[0],
    [projects, selectedId],
  );

  function updateProject(
    updater: (project: FutureReadyProject) => FutureReadyProject,
  ) {
    if (!selected) return;

    setProjects((current) =>
      current.map((project) =>
        project.id === selected.id ? updater(project) : project,
      ),
    );
    setSaved(false);
  }

  function saveAll() {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    setSaved(true);
  }

  function addProject() {
    const next = blankProject();
    setProjects((current) => [...current, next]);
    setSelectedId(next.id);
  }

  function addMember(studentId: string) {
    const student = projectStudents.find((item) => item.id === studentId);
    if (!student || selected?.members.some((member) => member.id === studentId)) {
      return;
    }

    updateProject((project) => ({
      ...project,
      members: [
        ...project.members,
        {
          id: student.id,
          name: student.name,
          role: defaultProjectRoles[project.members.length % defaultProjectRoles.length],
        },
      ],
    }));
  }

  function addTask() {
    if (!newTask.trim()) return;

    updateProject((project) => ({
      ...project,
      tasks: [
        ...project.tasks,
        {
          id: `task-${Date.now()}`,
          title: newTask.trim(),
          ownerId: project.members[0]?.id ?? "",
          dueDate: "",
          status: "To Do",
          notes: "",
        },
      ],
    }));
    setNewTask("");
  }

  function addLink() {
    if (!newLink.trim()) return;

    const asset: ProjectAsset = {
      id: `asset-${Date.now()}`,
      name: newLinkName.trim() || newLink.trim(),
      kind: "Link",
      url: newLink.trim(),
      visibility: "Project Team",
      includeInPresentation: false,
      includeInPortfolio: false,
    };

    updateProject((project) => ({
      ...project,
      assets: [...project.assets, asset],
    }));

    setNewLink("");
    setNewLinkName("");
  }

  function uploadFiles(files: FileList | null) {
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (file.size > MAX_FILE_SIZE) {
        window.alert(`${file.name} is larger than 2 MB. Add it as a shared link instead.`);
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        const kind: ProjectAsset["kind"] = file.type.startsWith("image/")
          ? "Image"
          : file.type.startsWith("video/")
            ? "Video"
            : "File";

        updateProject((project) => ({
          ...project,
          assets: [
            ...project.assets,
            {
              id: `asset-${Date.now()}-${file.name}`,
              name: file.name,
              kind,
              url: "",
              dataUrl: String(reader.result ?? ""),
              visibility: "Project Team",
              includeInPresentation: false,
              includeInPortfolio: false,
            },
          ],
        }));
      };

      reader.readAsDataURL(file);
    });
  }

  if (!hydrated || !selected) {
    return (
      <main className="min-h-screen bg-slate-50 px-5 py-8">
        <p className="font-black text-slate-600">Loading Project Studio…</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8">
      <div className="mx-auto max-w-7xl">
        <header className="rounded-[30px] bg-[#0D1B3D] px-7 py-8 text-white shadow-xl">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#F2B705]">
                Ambassador Christian School
              </p>
              <h1 className="mt-2 text-4xl font-black">Project Studio™</h1>
              <p className="mt-3 text-lg text-slate-200">
                Private project workspaces for assigned teams, facilitators, and admins.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={addProject}
                className="rounded-xl border border-white/30 px-5 py-3 font-black"
              >
                New Project
              </button>
              <button
                type="button"
                onClick={saveAll}
                className="rounded-xl bg-[#F2B705] px-5 py-3 font-black text-[#0D1B3D]"
              >
                Save All
              </button>
            </div>
          </div>

          {saved ? (
            <p className="mt-4 font-black text-emerald-300">Saved.</p>
          ) : null}
        </header>

        <section className="mt-8 grid gap-8 xl:grid-cols-[320px_1fr]">
          <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-black text-[#0D1B3D]">Projects</h2>

            <div className="mt-4 space-y-3">
              {projects.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => setSelectedId(project.id)}
                  className={`w-full rounded-2xl border p-4 text-left ${
                    selectedId === project.id
                      ? "border-[#F2B705] bg-[#FFF9DF]"
                      : "border-slate-200"
                  }`}
                >
                  <p className="font-black text-[#0D1B3D]">{project.title}</p>
                  <p className="mt-1 text-sm text-slate-600">
                    {project.members.length} members · {project.visibility}
                  </p>
                </button>
              ))}
            </div>
          </aside>

          <section className="space-y-7">
            <div className="grid gap-6 lg:grid-cols-2">
              <Field label="Project Title">
                <input
                  value={selected.title}
                  onChange={(event) =>
                    updateProject((project) => ({
                      ...project,
                      title: event.target.value,
                    }))
                  }
                  className={inputClass}
                />
              </Field>

              <Field label="Visibility">
                <select
                  value={selected.visibility}
                  onChange={(event) =>
                    updateProject((project) => ({
                      ...project,
                      visibility: event.target.value as ProjectVisibility,
                    }))
                  }
                  className={inputClass}
                >
                  {projectVisibilities.map((visibility) => (
                    <option key={visibility}>{visibility}</option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="Project Goal">
              <textarea
                rows={3}
                value={selected.description}
                onChange={(event) =>
                  updateProject((project) => ({
                    ...project,
                    description: event.target.value,
                  }))
                }
                className={inputClass}
              />
            </Field>

            <section className={cardClass}>
              <h2 className={titleClass}>Team & Roles</h2>

              <div className="mt-4 flex gap-3">
                <select
                  id="student-picker"
                  className={inputClass}
                  defaultValue=""
                  onChange={(event) => {
                    if (event.target.value) {
                      addMember(event.target.value);
                      event.target.value = "";
                    }
                  }}
                >
                  <option value="">Add a student</option>
                  {projectStudents
                    .filter(
                      (student) =>
                        !selected.members.some((member) => member.id === student.id),
                    )
                    .map((student) => (
                      <option key={student.id} value={student.id}>
                        {student.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {selected.members.map((member) => (
                  <div
                    key={member.id}
                    className="rounded-2xl border border-slate-200 p-4"
                  >
                    <p className="font-black text-[#0D1B3D]">{member.name}</p>
                    <select
                      value={member.role}
                      onChange={(event) =>
                        updateProject((project) => ({
                          ...project,
                          members: project.members.map((item) =>
                            item.id === member.id
                              ? { ...item, role: event.target.value }
                              : item,
                          ),
                        }))
                      }
                      className={inputClass}
                    >
                      {defaultProjectRoles.map((role) => (
                        <option key={role}>{role}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </section>

            <section className={cardClass}>
              <h2 className={titleClass}>Task Board</h2>

              <div className="mt-4 flex gap-3">
                <input
                  value={newTask}
                  onChange={(event) => setNewTask(event.target.value)}
                  placeholder="Add a task"
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={addTask}
                  className="rounded-xl bg-[#0D1B3D] px-5 font-black text-white"
                >
                  Add
                </button>
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-5">
                {projectStatuses.map((status) => (
                  <div key={status} className="rounded-2xl bg-slate-50 p-3">
                    <p className="text-sm font-black text-[#0D1B3D]">{status}</p>

                    <div className="mt-3 space-y-3">
                      {selected.tasks
                        .filter((task) => task.status === status)
                        .map((task) => (
                          <article
                            key={task.id}
                            className="rounded-xl border border-slate-200 bg-white p-3"
                          >
                            <input
                              value={task.title}
                              onChange={(event) =>
                                updateProject((project) => ({
                                  ...project,
                                  tasks: project.tasks.map((item) =>
                                    item.id === task.id
                                      ? { ...item, title: event.target.value }
                                      : item,
                                  ),
                                }))
                              }
                              className="w-full font-bold outline-none"
                            />

                            <select
                              value={task.ownerId}
                              onChange={(event) =>
                                updateProject((project) => ({
                                  ...project,
                                  tasks: project.tasks.map((item) =>
                                    item.id === task.id
                                      ? { ...item, ownerId: event.target.value }
                                      : item,
                                  ),
                                }))
                              }
                              className={inputClass}
                            >
                              <option value="">Unassigned</option>
                              {selected.members.map((member) => (
                                <option key={member.id} value={member.id}>
                                  {member.name}
                                </option>
                              ))}
                            </select>

                            <select
                              value={task.status}
                              onChange={(event) =>
                                updateProject((project) => ({
                                  ...project,
                                  tasks: project.tasks.map((item) =>
                                    item.id === task.id
                                      ? {
                                          ...item,
                                          status: event.target
                                            .value as ProjectTaskStatus,
                                        }
                                      : item,
                                  ),
                                }))
                              }
                              className={inputClass}
                            >
                              {projectStatuses.map((item) => (
                                <option key={item}>{item}</option>
                              ))}
                            </select>
                          </article>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="grid gap-6 lg:grid-cols-2">
              <Field label="Brainstorming Board">
                <textarea
                  rows={8}
                  value={selected.brainstormingNotes}
                  onChange={(event) =>
                    updateProject((project) => ({
                      ...project,
                      brainstormingNotes: event.target.value,
                    }))
                  }
                  className={inputClass}
                />
              </Field>

              <Field label="Workflow">
                <textarea
                  rows={8}
                  value={selected.workflowNotes}
                  onChange={(event) =>
                    updateProject((project) => ({
                      ...project,
                      workflowNotes: event.target.value,
                    }))
                  }
                  className={inputClass}
                />
              </Field>
            </div>

            <section className={cardClass}>
              <h2 className={titleClass}>Files, Images, Videos & Resources</h2>

              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                <label className="rounded-2xl border border-dashed border-slate-300 p-5">
                  <span className="font-black text-[#0D1B3D]">
                    Upload files up to 2 MB each
                  </span>
                  <input
                    type="file"
                    multiple
                    onChange={(event) => uploadFiles(event.target.files)}
                    className="mt-3 block w-full"
                  />
                </label>

                <div className="rounded-2xl border border-slate-200 p-5">
                  <input
                    value={newLinkName}
                    onChange={(event) => setNewLinkName(event.target.value)}
                    placeholder="Resource name"
                    className={inputClass}
                  />
                  <input
                    value={newLink}
                    onChange={(event) => setNewLink(event.target.value)}
                    placeholder="Google Drive, Canva, video, or website link"
                    className={inputClass}
                  />
                  <button
                    type="button"
                    onClick={addLink}
                    className="mt-3 rounded-xl bg-[#0D1B3D] px-5 py-3 font-black text-white"
                  >
                    Add Link
                  </button>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {selected.assets.map((asset) => (
                  <article
                    key={asset.id}
                    className="rounded-2xl border border-slate-200 p-4"
                  >
                    <p className="font-black text-[#0D1B3D]">{asset.name}</p>
                    <p className="mt-1 text-sm text-slate-500">{asset.kind}</p>

                    {asset.dataUrl && asset.kind === "Image" ? (
                      <img
                        src={asset.dataUrl}
                        alt={asset.name}
                        className="mt-3 max-h-48 w-full rounded-xl object-cover"
                      />
                    ) : null}

                    {asset.url ? (
                      <a
                        href={asset.url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-block font-black text-[#24569B]"
                      >
                        Open resource
                      </a>
                    ) : null}

                    <div className="mt-4 space-y-2">
                      <label className="flex items-center gap-2 text-sm font-bold">
                        <input
                          type="checkbox"
                          checked={asset.includeInPresentation}
                          onChange={(event) =>
                            updateProject((project) => ({
                              ...project,
                              assets: project.assets.map((item) =>
                                item.id === asset.id
                                  ? {
                                      ...item,
                                      includeInPresentation: event.target.checked,
                                    }
                                  : item,
                              ),
                            }))
                          }
                        />
                        Include in presentation
                      </label>

                      <label className="flex items-center gap-2 text-sm font-bold">
                        <input
                          type="checkbox"
                          checked={asset.includeInPortfolio}
                          onChange={(event) =>
                            updateProject((project) => ({
                              ...project,
                              assets: project.assets.map((item) =>
                                item.id === asset.id
                                  ? {
                                      ...item,
                                      includeInPortfolio: event.target.checked,
                                    }
                                  : item,
                              ),
                            }))
                          }
                        />
                        Include in portfolio
                      </label>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <Field label="Presentation Plan">
              <textarea
                rows={6}
                value={selected.presentationNotes}
                onChange={(event) =>
                  updateProject((project) => ({
                    ...project,
                    presentationNotes: event.target.value,
                  }))
                }
                className={inputClass}
              />
            </Field>

            <Field label="Facilitator Feedback">
              <textarea
                rows={5}
                value={selected.facilitatorFeedback}
                onChange={(event) =>
                  updateProject((project) => ({
                    ...project,
                    facilitatorFeedback: event.target.value,
                  }))
                }
                className={inputClass}
              />
            </Field>
          </section>
        </section>
      </div>
    </main>
  );
}

const inputClass =
  "mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-[#F2B705] focus:ring-2 focus:ring-[#F2B705]/20";

const cardClass =
  "rounded-3xl border border-slate-200 bg-white p-6 shadow-sm";

const titleClass = "text-2xl font-black text-[#0D1B3D]";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className={cardClass}>
      <span className="text-sm font-black uppercase tracking-[0.14em] text-[#0D1B3D]">
        {label}
      </span>
      {children}
    </label>
  );
}
